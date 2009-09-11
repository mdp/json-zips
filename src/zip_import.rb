require 'rubygems'
require 'fastercsv'
require 'json'

file = "zips_better.csv"
output_dir = '../zips/'

csv = FasterCSV.read(file)
csv.slice!(0)

groups = {}

csv.each do |z|
  groups[z[0][0..2]] ||= {}
  groups[z[0][0..2]][z[0]] = {:state => z[1], :city => z[4]}
end
groups.each_pair do |k,v|
  f = File.new(output_dir + k + ".json",  "w")
  f << "ComSquarepushJsonzips.zips(#{v.to_json});"
end