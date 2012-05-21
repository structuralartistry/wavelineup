Wavelineup.Views.AccountingTransactionListItem = Backbone.View.extend({
  tagName: 'tr',

  template: function(json) {
    var t = " \
      <td><%= date_time %></td> \
      <td><%= income_expense %></td> \
      <td><%= amount %></td> \
      <td><%= accounting_category_value %></td> \
      <td><%= accounting_account_value %></td> \
      <td><%= note %></td>"

    if(json.invoice_id==null) {
      t += "<td><input class='edit' type='submit' value='Edit'></td>";
    } else {
      t += "<td><input class='view_invoice' type='submit' value='Invoice'></td>";
    }

    return _.template(t,json);
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
