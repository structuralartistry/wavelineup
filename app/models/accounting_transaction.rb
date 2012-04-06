class AccountingTransaction < ActiveRecord::Base
  attr_accessible :account_id, :amount, :amount, :category_id, :date, :note, :type_id

  validates :t_datetime, :t_type_id, :amount, :category_id, :account_id, :presence => true
end
