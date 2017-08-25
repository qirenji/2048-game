window.onload = function(){
	var game;
	var container = document.getElementById('div2048');
	var startBtn = document.getElementById('start');
	// startBtn.onclick = function(){
	// 	console.log(this);
	// 	this.style.display = 'none';
		//创建游戏
		game = game || new game2048(container);
		game.init();
	// }
	// 获取键盘值
	document.onkeydown = function(ev){
		var keynum, keychar;
		if(window.event){
			keynum = ev.keyCode;
		}
		else if(ev.which){
			keynum = ev.which;
		}
		keychar = String.fromCharCode(keynum);
		if(['W','S','A','D'].indexOf(keychar) > -1){
			if(game.over()){
				if(confirm('游戏结束！是否重新开始～')){
					window.location.reload();
				}
			}
			game.move(keychar);
			game.win();
		}

	}
}

function game2048(container){
	this.container = container;
	this.tiles = new Array(16);
}

game2048.prototype = {
	// 游戏初始化
	init: function(){
		var allTile = '';
		for(var i=0, len = this.tiles.length; i < len;i++){
			var tile = this.newTile(0);
			tile.setAttribute('index',i);
			this.container.appendChild(tile);
      this.tiles[i] = tile;
		}
		this.randomTile();
		this.randomTile();
	},
	// 某个格子生成数字
	newTile: function(val){
		var tile = document.createElement('div');
		this.setTileVal(tile,val);
		return tile;
	},
	// 设置格子的值
	setTileVal: function(tile,val){
		tile.className = 'tile tile'+ val;
		tile.setAttribute('val',val);
		tile.innerHTML = val>0 ? val : '';
	},
	// 随机格子
	randomTile: function() {
		var zeroTiles = [];
		for(var i=0,len=this.tiles.length;i<len;i++){
			if(this.tiles[i].getAttribute('val') == 0){
				zeroTiles.push(this.tiles[i]);
			}
		}
		var rTile = zeroTiles[Math.floor(Math.random() * zeroTiles.length)];
		this.setTileVal(rTile,Math.random() < 0.8 ? 2:4);
	},
	// 游戏结束
	over: function(){
		for(var i=0,len=this.tiles.length;i<len;i++){
			if(this.tiles[i].getAttribute('val') == 0){
				return false;
			}
			if(i%4 != 3){
				if(this.equal(this.tiles[i],this.tiles[i+1])){
					return false;
				}
			}
			if(i<12){
				if(this.equal(this.tiles[i],this.tiles[i+4])){
					return false;
				}
			}
		}
		return true;
	},
	// 移动键盘的响应
	move: function(direction){
		var j;
		switch(direction){
			case 'W':
				for(var i=4,len=this.tiles.length;i<len;i++){
					j = i;
					while(j >=4){
						this.merge(this.tiles[j-4],this.tiles[j]);
						j -= 4;
					}
				}
				break;
			case 'S':
				for(var i=11;i>=0;i--){
					j = i;
					while(j <= 11){
						this.merge(this.tiles[j+4],this.tiles[j]);
						j -= 4;
					}
				}
				break;
			case 'A':
				for(var i=1,len=this.tiles.length;i<len;i++){
					j = i;
					while(j%4 != 0){
						this.merge(this.tiles[j-1],this.tiles[j]);
						j -= 1;
					}
				}
				break;
			case 'D':
				for(var i=14;i>=0;i--){
					j = i;
					while(j%4 != 3){
						this.merge(this.tiles[j+1],this.tiles[j]);
						j += 1;
					}
				}
				break;
		}
		var full = true;
		for (var i = 0; i<this.tiles.length; i++) {
			 if(this.tiles[i].getAttribute('val') == 0){
			 	full = false;
			 }			 
		}
		if(!full){
			this.randomTile();	
		}else{
			// alert('换个方向试试～～')
		}

	},
	// 判断两个格子是否相等
	equal: function(tile1,tile2){
		return tile1.getAttribute('val') == tile2.getAttribute('val');
	},
	// 合并两个格子
	merge: function(prevTile,currTile){
		var prevVal = prevTile.getAttribute('val');
		var currVal = currTile.getAttribute('val');
		if(currVal != 0){
			if(prevVal == 0){
				this.setTileVal(prevTile,currVal);
				this.setTileVal(currTile,0);
			}
			else if(prevVal == currVal){
				this.setTileVal(prevTile,prevVal * 2);
				this.setTileVal(currTile,0);
			}
		}
	},
	// 获取胜利
	win: function(){
		var isConfirm = false;
		for(var i = 0, len = this.tiles.length; i < len; i++){
      if(this.tiles[i].getAttribute('val') == 64){
        if(!isConfirm){
        	if(!confirm('恭喜你,获得胜利！是否继续游戏？')){
        		window.location.reload();
        	}
      	}
      	isConfirm = true;
      }
    }
	}

}






