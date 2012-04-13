class AccountingTransaction < ActiveRecord::Base
  attr_accessible :date_time, :credit_debit_id, :account_id, :amount, :amount, :category_id, :date, :note

  validates :date_time, :credit_debit_id, :amount, :category_id, :account_id, :presence => true
end
