class AccountingTransaction < ActiveRecord::Base
  belongs_to :practice
  belongs_to :invoice

  attr_accessible :date_time, :invoice_id, :income_expense, :account_key, :amount, :amount, :category_key, :date, :note, :receivable_id

  validates :date_time, :practice_id, :income_expense, :amount, :category_key, :account_key, :presence => true
end
