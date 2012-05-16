class Identity < ActiveRecord::Base
  has_many :invoices
  belongs_to :practice

  attr_accessible :company_name, :first_name, :last_name, :middle_name, :type_id
end
