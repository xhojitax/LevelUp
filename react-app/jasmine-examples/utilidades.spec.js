describe('Utilidades de LevelUp - Pruebas con Jasmine', function() {

  describe('Validación de Email', function() {
    
    it('debe validar un email correcto', function() {
      expect(validarEmail('usuario@example.com')).toBe(true);
    });

    it('debe rechazar un email sin @', function() {
      expect(validarEmail('usuarioexample.com')).toBe(false);
    });

    it('debe rechazar un email sin dominio', function() {
      expect(validarEmail('usuario@')).toBe(false);
    });

    it('debe rechazar un email vacío', function() {
      expect(validarEmail('')).toBe(false);
    });

  });

  describe('Validación de Contraseña', function() {
    
    it('debe aceptar una contraseña válida de 6 caracteres', function() {
      expect(validarPassword('123456')).toBe(true);
    });

    it('debe rechazar una contraseña de menos de 6 caracteres', function() {
      expect(validarPassword('12345')).toBe(false);
    });

    it('debe rechazar una contraseña vacía', function() {
      expect(validarPassword('')).toBe(false);
    });

  });

  describe('Cálculo de Total del Carrito', function() {
    
    it('debe calcular el total correctamente con un producto', function() {
      const productos = [
        { nombre: 'Mouse', precio: 29990, cantidad: 1 }
      ];
      expect(calcularTotal(productos)).toBe(29990);
    });

    it('debe calcular el total con múltiples productos', function() {
      const productos = [
        { nombre: 'Mouse', precio: 29990, cantidad: 2 },
        { nombre: 'Teclado', precio: 79990, cantidad: 1 }
      ];
      expect(calcularTotal(productos)).toBe(139970);
    });

    it('debe retornar 0 con carrito vacío', function() {
      expect(calcularTotal([])).toBe(0);
    });

  });

  describe('Aplicar Descuento', function() {
    
    it('debe aplicar un 10% de descuento correctamente', function() {
      expect(aplicarDescuento(100000, 10)).toBe(90000);
    });

    it('debe aplicar un 50% de descuento correctamente', function() {
      expect(aplicarDescuento(100000, 50)).toBe(50000);
    });

    it('debe lanzar error con porcentaje negativo', function() {
      expect(function() {
        aplicarDescuento(100000, -10);
      }).toThrowError('Porcentaje inválido');
    });

    it('debe lanzar error con porcentaje mayor a 100', function() {
      expect(function() {
        aplicarDescuento(100000, 150);
      }).toThrowError('Porcentaje inválido');
    });

  });

  describe('Formatear Precio', function() {
    
    it('debe formatear precio correctamente', function() {
      expect(formatearPrecio(29990)).toBe('$29.990');
    });

    it('debe formatear precio grande con separador de miles', function() {
      expect(formatearPrecio(1000000)).toContain('1.000.000');
    });

  });

  describe('Filtrar Productos por Categoría', function() {
    
    var productos;

    beforeEach(function() {
      productos = [
        { nombre: 'Mouse', categoria: 'periferico' },
        { nombre: 'Teclado', categoria: 'periferico' },
        { nombre: 'Silla', categoria: 'accesorio' },
        { nombre: 'God of War', categoria: 'videojuego' }
      ];
    });

    it('debe retornar todos los productos con categoría "todos"', function() {
      expect(filtrarPorCategoria(productos, 'todos').length).toBe(4);
    });

    it('debe filtrar productos de categoría "periferico"', function() {
      var resultado = filtrarPorCategoria(productos, 'periferico');
      expect(resultado.length).toBe(2);
      expect(resultado[0].nombre).toBe('Mouse');
    });

    it('debe filtrar productos de categoría "videojuego"', function() {
      var resultado = filtrarPorCategoria(productos, 'videojuego');
      expect(resultado.length).toBe(1);
      expect(resultado[0].nombre).toBe('God of War');
    });

  });

});