const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <main className="content-grid">{props.children}</main>;
    </>
  );
};

export default Layout;
