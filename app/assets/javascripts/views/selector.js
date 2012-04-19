Wavelineup.Views.Selector = Backbone.View.extend( {
  tagName: 'table',

  template: function(json) {
    var t = " \
      <tbody> \
        <tr> \
          <td><a class='btn selector value' id='credit_debit_id'>1 > 3</a></td> \
          <td><a class='btn selector value' id='credit_debit_id'>1 > 3</a></td> \
          <td><a class='btn selector value' id='credit_debit_id'>1 > 3</a></td> \
          <td><a class='btn selector value' id='credit_debit_id'>1 > 3</a></td> \
          <td><a class='btn selector value' id='credit_debit_id'>1 > 3</a></td> \
          <td><a class='btn selector value' id='credit_debit_id'>Something VEEERRRRYY LONNNNNG</a></td> \
        </tr> \
      </tbody> "
    return _.template(t,json);
  },

  events: {
    'mousedown .value': 'set_value'
  },

  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  set_value: function() {
    $('#selector_container').hide();
  }

});
