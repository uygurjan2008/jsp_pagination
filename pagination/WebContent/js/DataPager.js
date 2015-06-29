function DataPager(start, size, totalItem, target) {
		createcss(target);
		var target=$(target)[0];
		var self = this;
		var start = parseInt(start) != 0 ? start : 0;
		var linkSize = parseInt(size) != 0 ? size : 0;
		var totalItem = parseInt(totalItem) != 0 ? totalItem : 0;
		var target = target != null ? target : null;
		this.setTotalItem = function(count) {
			totalItem = count;
		}
		this.setSize = function(size) {
			linkSize = size;
		}
		this.setStart = function(index) {
			start = index;
		}
		this.setTarget = function(element) {
			target = element;
		}

		this.getTotalItem = function() {
			return totalItem;
		}
		this.getSize = function() {
			return linkSize;
		}
		this.getStart = function() {
			return start;
		}
		this.getTarget = function() {
			return target;
		}
		this.createLink = function() {
			return document.createElement("a");
		}
		this.linkOnclick = function(click) {
			target.onclick = click;
		}
		this.show = function() {
			var index = 0;
			target.innerHTML = '';
			if (start <= totalItem) {
				var end = start + linkSize;
				var before = (start - linkSize) > 0 ? (start - linkSize) : 1;
				if (totalItem <= linkSize) {
					start = 1;
				}
				if (totalItem > linkSize) {
					var firstLink = self.createLink();
					firstLink.onclick = function() {
						start = 1;
						self.show();
					}
					firstLink.href = "#!";
					firstLink.innerHTML = "|<";//第一个
					target.appendChild(firstLink);
					if (end - 1 > linkSize) {
						var beforeMoreLink = self.createLink();
						beforeMoreLink.onclick = function() {
							start = before;
							self.show();
						}
						beforeMoreLink.href = "#!";
						beforeMoreLink.innerHTML = "<<";//上一个
						target.appendChild(beforeMoreLink);
					}
					var lastLink = self.createLink();
					lastLink.onclick = function() {
						start = totalItem - linkSize + 1;
						self.show();
					}
					lastLink.href = "#!";
					lastLink.innerHTML = ">|";//最后一个
				}

				for (; start < end && start <= totalItem; start++) {
					index++;
					var indexLink = self.createLink();
					indexLink.onclick = function() {
						start = parseInt(this.innerText);
					}
					indexLink.href = "#!";
					indexLink.innerText = start.toString();
					target.appendChild(indexLink);
					if (index === linkSize && end - 1 < totalItem) {
						var afterMoreLink = self.createLink();
						afterMoreLink.onclick = function() {
							start = end;
							self.show();
						}
						afterMoreLink.href = "#!";
						afterMoreLink.innerHTML = ">>";//下一个
						target.appendChild(afterMoreLink);
						break;
					}
				}
				if (lastLink) {
					target.appendChild(lastLink);
				}
			}
		}
	}

	function createcss(target) {
		var flag = false;
		var style_a1 = target + " a {\r" + "line-height:35px;\r"
				+ "height:30px;\r" + "min-width:30px;\r" + "padding:5px;\r"
				+ "display:inline-block;\r" + "font-size:12pt;\r"
				+ "font-family:Arial;\r" + "text-decoration:none;\r"
				+ "background-color:gainsboro;\r"
				+ "border: 1px solid #d3d3d3;\r" + "direction:ltr;\r"
				+ "text-align:center;\r" + "color:#000000;\r}\r";

		var hover = "\r" + target + " a:hover{\r"
				+ "background-color :#26a590;\r" + "color:#ffffff;\r}\r";

		var focus = "\r" + target + " a:focus{\r" + "background-color:green;\r"
				+ "color:#ffffff;\r}";

		var mylink = "\r.myLink {\r" + "margin: 0px auto;\r"
				+ "background-color: deepskyblue;\r}\r";

		var css = document.getElementById("css");
		if (css != null) {
			return;
		}
		var sty = document.createElement("style");
		sty.id = "css";
		sty.innerHTML = style_a1 + hover + focus + mylink;

		document.head.appendChild(sty);
		flag = true;
		return flag;
	}

	//pagination;
	var totalPage = 0;
	var totalItem = 0;
	function getData(i, a, b) {

		 
		$
				.ajax({
					url : "pagination.jsp",
					type : "get",
					data : {
						"i" : i,
						pagesize : a,
						tablename : b
					},
					dataType : "json",
					async : false,
					success : function(jsonData) {
						var mother = $("#show_info");
						mother.empty();
						var items = jsonData.items;
						console.log("items", items);
						totalPage = jsonData.pagination[0].totalPage;//总共页面
						totalItem = jsonData.pagination[0].totalItem;//总共数据

						for (var i = 0; i < items.length; i++) {
							var tmp = "<ul>"
									+ "<li class='li_check'><input type=\"checkbox\" name=\"id\" value=\""+items[i]["id"]+"\"/></li>"
									+ "<li class='li_id'>" + items[i]['id']
									+ "</li>" + "<li class='lis'>"
									+ items[i]['cell_number'] + "</li>"
									+ "<li class='lis'>" + items[i]['city']
									+ "</li>" + "<li class='lis'>"
									+ items[i]['card_type'] + "</li>" + "</ul>";
						 
							mother.append(tmp);
						}

					}
				});

		 return totalPage;

	}
