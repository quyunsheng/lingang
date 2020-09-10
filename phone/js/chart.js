var myChartA = echarts.init(document.getElementById('chart-trend'));
var myChartB = echarts.init(document.getElementById('chart-trend-2'));
var myChartC = echarts.init(document.getElementById('chart-trend-3'));
$.ajax({
		url: path + '/linA/getjjqs',
		type: 'GET',
		data: {},
		dataType: 'json', //后台返回的数据类型是json文本
		// beforeSend: function(XMLHttpRequest) {
		// 	XMLHttpRequest.setRequestHeader("token", tkn);
		// },
		success: function(result) {
			if (result != "" && result.code == 1) {
			var	optionA = {
					title: {
						text: ''
					},
					tooltip : {
						trigger: 'axis',
					},
					legend: {
						data:['螺纹'],
						right:0,
					},
					grid: {
						left: '1%',
						right: '5%',
						bottom: '1%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : result.data.hg_date
						}
					],
					yAxis : [
						{
							scale: true,
							type : 'value'
						}
					],
					series : [
						{
							name:'螺纹',
							type:'line',
							itemStyle : {
								normal : { 
									color:'#2b7ec5', //改变折线点的颜色
									lineStyle:{ 
										color:'#2b7ec5' //改变折线颜色
									}
								} 
							},
							data : result.data.hg_lw,
							smooth: true
						}
					]
				};
				var	optionB = {
						title: {
							text: ''
						},
						tooltip : {
							trigger: 'axis',
						},
						legend: {
							data:['钢坯'],
							right:0,
						},
						grid: {
							left: '1%',
							right: '5%',
							bottom: '1%',
							containLabel: true
						},
						xAxis : [
							{
								type : 'category',
								boundaryGap : false,
								data : result.data.hg_date,
							}
						],
						yAxis : [
							{
								scale: true,
								type : 'value'
							}
						],
						series : [
							{
								name:'钢坯',
								type:'line',
								itemStyle : {
									normal : { 
										color:'#04bdd6', //改变折线点的颜色
										lineStyle:{ 
											color:'#04bdd6' //改变折线颜色
										}
									} 
								},
								data : result.data.hg_lz,
								smooth: true
							} 
						]
					};
					var	optionC = {
							title: {
								text: ''
							},
							tooltip : {
								trigger: 'axis',
							},
							legend: {
								data:['热轧'],
								right:0,
							},
							grid: {
								left: '1%',
								right: '5%',
								bottom: '1%',
								containLabel: true
							},
							xAxis : [
								{
									type : 'category',
									boundaryGap : false,
									data : result.data.hg_date
								}
							],
							yAxis : [
								{
									scale: true,
									type : 'value'
								}
							],
							series : [
								{
									name:'热轧',
									type:'line',
									itemStyle : {
										normal : { 
											color:'#cc0000', //改变折线点的颜色
											lineStyle:{ 
												color:'#cc0000' //改变折线颜色
											}
										} 
									},
									data : result.data.hg_rz,
									smooth: true
								} 
							]
						};
				myChartA.setOption(optionA);
				myChartB.setOption(optionB);
				myChartC.setOption(optionC);
				 
				window.addEventListener("resize",function (){
					myChartA.resize();
					myChartB.resize();
					myChartC.resize();
				
				})
				
			}
		},
		
	
})
