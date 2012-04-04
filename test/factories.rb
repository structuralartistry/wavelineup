Factory.define :accounting_transaction do |f|
  f.t_datetime '2012-01-01 13:00'
  f.t_type_id 1
  f.amount 11.11
  f.category_id 1
  f.account_id 1
  f.note 'blah'
end
