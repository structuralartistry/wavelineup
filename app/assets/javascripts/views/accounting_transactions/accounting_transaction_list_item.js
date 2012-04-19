Wavelineup.Views.AccountingTransactionListItem = Backbone.View.extend({
  tagName: 'tr',

  template: function(json) {
    var t = " \
      <td><%= date_time %></td> \
      <td><%= credit_debit_id %></td> \
      <td><%= amount %></td> \
      <td><%= category_id %></td> \
      <td><%= account_id %></td> \
      <td><%= note %></td> \
      <td><input class='edit' type='submit' value='Edit'></td>"
    return _.template(t,json);
  },

  events: {
    'mousedown .edit': 'edit'
  },

  initialize: function() {
    _.bindAll(this, 'render')
    this.model.bind('change', this.render, this)

    $(this.el).attr('id', this.model.get('id'));
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  edit: function(event) {
    Wavelineup.Controllers.AccountingTransactions.new_edit(this.model.id);
  }

});
