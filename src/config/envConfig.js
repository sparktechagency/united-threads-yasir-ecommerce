export const getBackendBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BACKEND_BASEURL;
};

export const getSocketEndpoint = () => {
  return process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;
};
