const getPlaceholder = (path) => {
  switch (path) {
  case '/comidas':
    return 'Comidas';
  case '/bebidas':
    return 'Bebidas';
  case '/explorar':
    return 'Explorar';
  case '/explorar/comidas':
    return 'Explorar Comidas';
  case '/explorar/bebidas':
    return 'Explorar Bebidas';
  case '/explorar/comidas/ingredientes':
    return 'Explorar Ingredientes';
  case '/explorar/bebidas/ingredientes':
    return 'Explorar Ingredientes';
  case '/explorar/comidas/area':
    return 'Explorar Origem';
  case '/perfil':
    return 'Perfil';
  case '/receitas-feitas':
    return 'Receitas Feitas';
  case '/receitas-favoritas':
    return 'Receitas Favoritas';
  default:
    return '';
  }
};

export default getPlaceholder;
