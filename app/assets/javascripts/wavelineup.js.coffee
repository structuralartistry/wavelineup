window.Wavelineup =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Templates: {}
  init: ->
    new Wavelineup.Routers.AccountingTransactions()
    # triggers the matching router for what is in the url:
    try
      Backbone.history.start()
    catch error
      # can not figure out how to do this in the jasmine test suite, so doing here
      Backbone.history.stop()
      Backbone.history.start()
