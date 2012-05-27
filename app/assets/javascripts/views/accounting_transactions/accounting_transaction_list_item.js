Wavelineup.Views.AccountingTransactionListItem = Backbone.View.extend({
  tagName: 'tr',

  template: function(json) {
    return Wavelineup.Templates.AccountingTransactions.list_item(json);
  },

  events: {
    'mousedown .edit': 'edit',
    'mousedown .view_invoice': 'view_invoice'
  },

  initialize: function() {
    _.bindAll(this, 'render')
    this.model.bind('change', this.render, this)

    $(this.el).addClass('accounting_transaction ' + this.model.get('id'));
  },

  render: function() {
    $(this.el).html(this.template(this.model.to_local_json()));
    return this;
  },

  edit: function (event) {
    Wavelineup.Controllers.AccountingTransactions.new_edit(this.model.get('id'));
  },

  view_invoice: function (event) {
    Wavelineup.Controllers.Invoices.edit(this.model.get('invoice_id'));
  }

});
