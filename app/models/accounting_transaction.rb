class AccountingTransaction < ActiveRecord::Base
  attr_accessible :account_id, :amount, :amount, :category_id, :date, :note, :type_id
end
