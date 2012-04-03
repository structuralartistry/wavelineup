window.Wavelineup =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    new Wavelineup.Routers.AccountingTransactions()
    # triggers the matching router for what is in the url:
    Backbone.history.start()

$(document).ready ->
  Wavelineup.init()
