Factory.define :accounting_transaction do |f|
  f.practice_id 1
  f.date_time DateTime.now
  f.income_expense 'income'
  f.amount 75.00
  f.accounting_category_id 1
  f.accounting_account_id 1
  f.note 'some notes'
end

Factory.define :option_selector_option do |f|
  f.option_selector_id 1
  f.practice_id 1
  f.value '%{option_selector_id}-%{practice_id}-%d'
end
