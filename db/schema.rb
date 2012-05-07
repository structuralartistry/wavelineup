# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120507163544) do

  create_table "accounting_transactions", :force => true do |t|
    t.integer  "practice_id"
    t.datetime "date_time"
    t.string   "credit_debit_key"
    t.integer  "amount"
    t.string   "category_key"
    t.string   "account_key"
    t.string   "note"
    t.integer  "invoice_id"
    t.integer  "receivable_id"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "invoices", :force => true do |t|
    t.integer  "practice_id"
    t.datetime "date_time"
    t.integer  "identity_id"
    t.string   "identity_write_in"
    t.integer  "visit_id"
    t.datetime "visit_date_time"
    t.text     "note"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  create_table "option_selector_options", :force => true do |t|
    t.integer  "option_selector_id"
    t.integer  "practice_id"
    t.string   "key"
    t.string   "value"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "option_selectors", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "practices", :force => true do |t|
    t.string   "name"
    t.string   "time_zone"
    t.integer  "referring_practice_id"
    t.datetime "created_at",            :null => false
    t.datetime "updated_at",            :null => false
  end

end
