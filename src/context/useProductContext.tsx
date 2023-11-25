import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {generateObjects} from '../utils';
import {ITEM_PER_PAGE} from '../constant';
import {IProduct} from '../types';

interface ProductContextProps {
  products: IProduct[];
  filteredProducts: IProduct[];
  searchText: string;
  currentPage: number;
  loading: boolean;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  handleSearch: (text: string) => void;
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  handleLoadMore: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({children}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadMore = useCallback(() => {
    if (loading) {
      return;
    }

    setLoading(true);

    const nextPage = currentPage + 1;
    const startIdx = (nextPage - 1) * ITEM_PER_PAGE;
    const next = products.slice(startIdx, startIdx + ITEM_PER_PAGE);

    if (next.length > 0) {
      setTimeout(() => {
        setFilteredProducts(prev => [...prev, ...next]);
        setCurrentPage(nextPage);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [currentPage, products, loading, setFilteredProducts]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);

      const filtered = (
        text ? products : products.slice(0, currentPage * ITEM_PER_PAGE)
      ).filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      );

      setFilteredProducts(filtered);
    },
    [currentPage, products, setFilteredProducts],
  );

  useEffect(() => {
    const pretendBackendCall = () => {
      const dataFromBackend = generateObjects(20);
      setProducts(dataFromBackend);
      setFilteredProducts(dataFromBackend.slice(0, ITEM_PER_PAGE));
    };

    setLoading(true);
    setTimeout(() => {
      pretendBackendCall();
      setLoading(false);
    }, 1000);
  }, []);

  const contextValue: ProductContextProps = useMemo(
    () => ({
      products,
      filteredProducts,
      setProducts,
      setFilteredProducts,
      searchText,
      handleSearch,
      currentPage,
      loading,
      handleLoadMore,
    }),
    [
      currentPage,
      filteredProducts,
      handleLoadMore,
      handleSearch,
      loading,
      products,
      searchText,
    ],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
