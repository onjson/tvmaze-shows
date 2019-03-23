export const getShowIdFromPathname = (pathname) => {
  const paths = pathname.split('/');
  return paths[paths.length - 1];
};

export const handleError = (status) => {
  switch (status) {
    case 404:
      return 'Show not found';
    default:
      return 'Something went wrong';
  }
};
