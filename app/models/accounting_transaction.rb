class AccountingTransaction < ActiveRecord::Base
  attr_accessible :date_time, :credit_debit_key, :account_key, :amount, :amount, :category_key, :date, :note

  validates :date_time, :credit_debit_key, :amount, :category_key, :account_key, :presence => true
end
