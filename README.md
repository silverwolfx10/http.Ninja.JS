### $http

Servico que facilita a comunicacao com os servidores remotos via http com o objeto XMLHttpRequest a funcao curry, retornando um promisse

```javascript
Ninja(['$http'], function ($http) {

  function render(xhr) {
    document.querySelector('body').innerHTML = xhr.responseText;
  }
  
  $http('GET', './template.html', '').when(200, render);
  
});
```
