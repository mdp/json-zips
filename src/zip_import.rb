require 'rubygems'
require 'fastercsv'
require 'json'

file = "zips_2006.csv"
basic_dir = '../zips/basic/'
complete_dir = '../zips/complete/'

csv = FasterCSV.read(file)
csv.slice!(0)

groups = {}

csv.each do |z|
  groups[z[0][0..2]] ||= {}
  groups[z[0][0..2]][z[0]] = {:state => z[3], :city => z[4].split(' ').map{|a| a.capitalize}.join(' ')}
end
groups.each_pair do |k,v|
  f = File.new(basic_dir + k + ".json",  "w")
  f << "ComSquarepushJsonzips.load_zips(#{v.to_json});"
end

csv.each do |z|
  groups[z[0][0..2]] ||= {}
  groups[z[0][0..2]][z[0]] = {:state => z[3], :city => z[4].split(' ').map{|a| a.capitalize}.join(' '),
  :lat => z[1], :long => z[2]
  }
end
groups.each_pair do |k,v|
  f = File.new(complete_dir + k + ".json",  "w")
  f << "ComSquarepushJsonzips.load_zips(#{v.to_json});"
end