import SearchBar from './searchBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchBar />
      {children}
    </>
  );
}
