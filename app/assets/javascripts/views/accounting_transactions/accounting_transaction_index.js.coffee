class Wavelineup.Views.AccountingTransactionsIndex extends Backbone.View

  template_html: ->
    " <h1>Hello World Index View from Backbone!!!</h1>
      <ul>{{#each accounting_transactions}}<li>{{t_datetime}} -- {{amount}}{{/each}}</ul>"

  initialize: ->
    @collection.on('reset', @render, this)

  render: ->
    source = @template_html() #$('#accounting_transaction_index').html()
    template = Handlebars.compile(source)
    data = { accounting_transactions: @collection.toJSON() }
    $('#container').html(template(data))

