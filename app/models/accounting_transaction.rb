class AccountingTransaction < ActiveRecord::Base
  belongs_to :practice
  belongs_to :invoice

  attr_accessible :date_time, :invoice_id, :credit_debit_key, :account_key, :amount, :amount, :category_key, :date, :note

  validates :date_time, :practice_id, :credit_debit_key, :amount, :category_key, :account_key, :presence => true
end
