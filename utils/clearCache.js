export function formatSize() {
			let Cache = "0B"
	plus.cache.calculate(function(size) {
		let sizeCache = parseInt(size);
		if (sizeCache == 0) {
			Cache = "0B";
		} else if (sizeCache < 1024) {
			Cache = sizeCache + "B";
		} else if (sizeCache < 1048576) {
			Cache = (sizeCache / 1024).toFixed(2) + "KB";
		} else if (sizeCache < 1073741824) {
			Cache = (sizeCache / 1048576).toFixed(2) + "MB";
		} else {
			Cache = (sizeCache / 1073741824).toFixed(2) + "GB";
		}
	});
			
}
       export function clearCache() {  
                let that = this;  
                let os = plus.os.name;  
                if (os == 'Android') {  
                    let main = plus.android.runtimeMainActivity();  
                    let sdRoot = main.getCacheDir();  
                    let files = plus.android.invoke(sdRoot, "listFiles");  
                    let len = files.length;  
                    for (let i = 0; i < len; i++) {  
                        let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
                        plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
                            if (entry.isDirectory) {  
                                entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
                                    uni.showToast({  
                                        title: '缓存清理完成',  
                                        duration: 2000  
                                    });  
                                    formatSize(); // 重新计算缓存  
                                }, function(e) {  
                                    console.log(e.message)  
                                });  
                            } else {  
                                entry.remove();  
                            }  
                        }, function(e) {  
                            console.log('文件路径读取失败')  
                        });  
                    }  
                } else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
                    plus.cache.clear(function() {  
                        uni.showToast({  
                            title: '缓存清理完成',  
                            duration: 2000  
                        });  
                        formatSize();  
                    });  
                }  
            }