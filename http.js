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
 *        $http('GET', './template.html', '').when(200, function (xhr) {
 *          document.querySelector('body').innerHTML = xhr.responseText;
 *        });
 * 
 */
Ninja.service('$http', ['$curry', '$interceptor'], function ($curry, $interceptor) {
  
  function http(method, url, parameters) {
    
    var listeners = {};
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
      this.readyState == 4 && (listeners[this.status] || function () {})($interceptor('response', this));
    };
    
    xhr.open(method, url, !0);
    $interceptor('request', xhr).send(parameters || '');
    
    return {
      
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
