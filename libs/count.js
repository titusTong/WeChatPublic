'use strict'

var fs = require('fs');


module.exports = function count(fpath, subscribe) {
	if(!fpath) {
		throw new Error('缺少文件路径')
	}

	var num;

	
	fs.exists(fpath, function (exists) {
		if(exists) {
			fs.readFile(fpath,'utf8',function (err,data) {
				if(err) {
					return
				} else {
					console.log(data);
					num = parseInt(data, 10);
				}
			})
		}
		else {
			fs.createWriteStream(fpath)
		}
	})
	

	if(isNaN(num)) {
		num = 0
	}
	if(subscribe) {
		num++;
		fs.writeFile(fpath, num)
	}
	else {
		num--;
		fs.writeFile(fpath, num)
	}
	return num
	/*return function *count(next) {
		if(this.method === 'GET' && this.url.indexOf('/favicon.ico') === -1) {
			num++

			fs.writeFile(fpath, num)
		}

		this.count = num
		yield* next;
	}*/
}
