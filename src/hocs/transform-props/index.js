const transformProps = f => Component => props => <Component {...f(props)} />;

export { transformProps };
