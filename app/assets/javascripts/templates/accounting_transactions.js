Wavelineup.Templates.AccountingTransactions = {
  accounting_transaction: function(json) {
    var t = " \
      <ul id='accounting_transaction_new_edit'> \
        <li><input type='text' id='date_time' value='<%= date_time %>'></li> \
        <li><input type='text' id='credit_debit_id' value='<%= credit_debit_id %>'></li> \
        <li><a id='credit_debit_id' class='btn option_selector_target' data-json_data_function='credit_debit'></a></li> \
        <li><input type='text' id='amount' value='<%= amount %>'></li> \
        <li><input type='text' id='category_id' value='<%= category_id %>'></li> \
        <li><a class='btn option_selector_target' id='category_id' data-option_selector_name='accounting_categories'>1 > 3</a></li> \
        <li><input type='text' id='account_id' value='<%= account_id %>'></li> \
        <li><a class='btn option_selector_target' id='account_id' data-option_selector_name='accounting_accounts'>1 > 3</a></li> \
        <li><input type='text' id='note' value='<%= note %>'></li> \
        <li><input class='save' type='submit' value='Save'></li> \
        <li><input class='delete' type='submit' value='Delete'></li> \
        <li><input class='cancel' type='submit' value='Cancel'></li> \
      </ul>"
    return _.template(t,json);
  }
}
