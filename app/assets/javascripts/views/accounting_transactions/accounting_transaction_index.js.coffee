class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View

  template_html: ->
    " <h1>Hello World Index View from Backbone!!!</h1>
      <p>{{content}}</p>"

  render: ->
    source = @template_html() #$('#accounting_transaction_index').html()
    template = Handlebars.compile(source)
    data = { content: 'something dynamic' }
    $('#container').html(template(data))

