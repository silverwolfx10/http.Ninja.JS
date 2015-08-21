/**
 * $http
 * 
 * Servico que facilita a comunicacao com os servidores remotos
 * via http com o objeto XMLHttpRequest a funcao curry, retornando um promisse
 * 
 * @module $http
 * @author Cleber de Moraes Gonçalves <cleber.programmer>
 * @example
 *
 *        function render(xhr) {
 *          document.querySelector('body').innerHTML = xhr.responseText;
 *        }
 * 
 *        $http('GET', './template.html', '').when(200, render);
 * 
 */
Ninja.module('$http', ['$curry', '$interceptor'], function ($curry, $interceptor) {
  
  /**
   * Servico que facilita a comunicacao com os servidores remotos via
   * http com o objeto XMLHttpRequest
   *
   * @public
   * @method http
   * @param {String} method Nome do metodo que sera executado
   * @param {String} url Endereco que o servico ira acessar
   * @param {String} parameters Valor que sera enviado para o servidor remoto
   * @return {Object} Promessa de retorno do servico
   * @example
   *
   *        $http('GET', './template.html', '');
   *
   */
  function http(method, url, parameters) {
    
    var listeners = {};
    var xhr = new XMLHttpRequest();
    
    /**
     * Quando a resposta do servido remoto chegar no readyState 4 sera
     * executado todos os interceptors para transformar a resposta do xhr, sendo
     * possivel que estes interceptors possam servir de notificacores
     * erro utilizando o servido $dispatcher
     */
    xhr.onreadystatechange = function () {
      this.readyState == 4 && (listeners[this.status] || function () {})($interceptor('response', this));
    };
    
    xhr.open(method, url, !0);
    
    /**
     * Antes da funcao sendo do xhr ser executada os interceptors correspondentes
     * seram executados para transformar o objeto xhr, sendo possivel a manipulacao dos
     * cabecalhos, formatacao da url para urls absolutas e etc...
     */
    $interceptor('request', xhr).send(parameters || '');
    
    return {
      
      /**
       * Promessa do retorno do servico $http, onde e possivel assinar ouvintes
       * dependendo dos status da resposta do servidor
       *
       * @public
       * @method when
       * @param {Number} status Status da resposta do servidor remoto
       * @param {Function} callback Funcao que sera executado quando o status for satisfeito
       * @example
       *
       *        $http('GET', './template.html', '').when(200, render);
       *
       */
      when: function (status, callback) {
        listeners[status] = callback;
        return this;
      }
      
    };
    
  }
  
  /**
   * Revelacao do servico $http, encapsulando a visibilidade das funcoes
   * privadas
   */
  return $curry(http);
  
});
