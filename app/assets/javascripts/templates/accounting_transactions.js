Wavelineup.Templates.AccountingTransactions = {
  accounting_transaction: function(json) {
    var t = " \
      <ul id='accounting_transaction_new_edit'> \
        <li><input type='text' id='date_time' value='<%= date_time %>'></li> \
        <li><a id='credit_debit_key' class='btn option_selector target' data-option_selector_name='accounting_credit_debit' data-set_key='<%= credit_debit_key %>' data-set_value=''><%= credit_debit_value %></a></li> \
        <li><input type='text' id='amount' value='<%= amount %>'></li> \
        <li><a id='category_key' class='btn option_selector target' data-option_selector_name='accounting_category' data-set_key='<%= category_key %>' data-set_value=''><%= category_value %></a></li> \
        <li><a id='account_key' class='btn option_selector target' data-option_selector_name='accounting_account' data-set_key='<%= account_key %>' data-set_value=''><%= account_value %></a></li> \
        <li><input type='text' id='note' value='<%= note %>'></li> \
        <li><input class='save' type='submit' value='Save'></li> \
        <li><input class='delete' type='submit' value='Delete'></li> \
        <li><input class='cancel' type='submit' value='Cancel'></li> \
      </ul>"
    return _.template(t,json);
  }
}
