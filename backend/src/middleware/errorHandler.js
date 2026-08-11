// Middleware de erro em pt-BR
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro Interno do Servidor',
      status: err.status || 500
    }
  });
};
