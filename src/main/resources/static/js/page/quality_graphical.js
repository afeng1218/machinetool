/**
 * Created by guofeng on 2017/11/14.
 */
define(['jquery', 'common', 'layer', 'chartBundle', 'page/common_search', 'datetimepicker'], function($, COMMON, layer, Chart, COMMON_SEARCH) {
    var af = {
        load:function(){//渲染接口
            COMMON.LAYER_CONFIG.config();
            var height=window.screen.height/5-3;
            $('#projectTable').parent().css('height', height+'px');
            af.chartNew();
            af.event();
        },
        configA:{
            type:'line',
            data:{
                labels:[],
                datasets:[]
            },
            options:{
                responsive:true,
                title:{
                    display:true,
                    position:'bottom'
                },
                legend:{
                    display:true,
                    position:'top'
                },
                tooltips:{
                    mode:'index'
                },
                scales:{
                    xAxes:[{
                        scaleLabel:{
                            display:false,
                            labelString:'Month'
                        }
                    }],
                    yAxes:[{
                        scaleLabel:{
                            display:false,
                            labelString:'Value'
                        },
                        ticks:{
                            beginAtZero:true
                        }
                    }]
                }
            }
        },
        configB:{
            type:'bar',
            data:{
                labels:[],
                datasets:[]
            },
            options:{
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                    }]
                }
            }
        },
        configC:{
            type:'line',
            data:{
                labels:[],
                datasets:[]
            },
            options:{
                responsive:true,
                title:{
                    display:true,
                    position:'bottom'
                },
                legend:{
                    display:true,
                    position:'top'
                },
                tooltips:{
                    mode:'index'
                },
                scales:{
                    xAxes:[{
                        scaleLabel:{
                            display:false,
                            labelString:'Month'
                        }
                    }],
                    yAxes:[{
                        scaleLabel:{
                            display:false,
                            labelString:'Value'
                        },
                        ticks:{
                            beginAtZero:true
                        },
                        gridLines:{
                            drawBorder:false,
                            color:[]
                        }
                    }]
                }
            }
        },
        //生成 平均值&&标准差
        chartNew:function(){
            var ctxA=document.getElementById("canvasA").getContext("2d");
            af.myLineA=new Chart(ctxA, af.configA);ctxA=null;
            var ctxB=document.getElementById("canvasB").getContext("2d");
            af.myLineB=new Chart(ctxB, af.configB);ctxB=null;
            var ctxC=document.getElementById("canvasC").getContext("2d");
            af.myLineC=new Chart(ctxC, af.configC);ctxC=null;
            return null;
        },
        sum:function(a){//平均数函数
            var sum=eval(a.join("+"));
            return sum/a.length;
        },
        stdDev:function(a){  //求标准差
            var m=af.sum(a); //此处要用到sum函数
            var sum=0;
            var l=a.length;
            for(var i=0;i<l;i++){
                var dev=a[i]-m;
                sum+=(dev*dev);
            };
            var s=Math.sqrt(sum/(l-1));
            return isNaN(s)?0:s;
        },
        //平均值的配置属性
        titleArryA:['平均值','CL','UCL','LCL','USL','LSL','Target'],
        colorArryA:['blue','red','red','red','green','green','green'],
        lineArryA:[0,10,7,3,10,7,3],
        //极差的配置属性
        titleArryB:['极差','CL','UCL','LCL'],
        colorArryB:['blue','red','red','red'],
        lineArryB:[0,10,7,3],
        //样本运行图
        titleArryYB:['样本运行图','USL','LSL','Target'],
        colorArryYB:['blue','green','green','green'],
        lineArryYB:[0,10,7,3],
        USLVal:0, //规格上限
        LSLVal:0,  //规格下限
        TargetVal:0,//目标值
        USL:[],LSL:[],Target:[],PJZ:[],CL:[],UCL:[],LCL:[],YB:[],
        BZC:[],ZDZ:[],ZXZ:[],JC:[],CPK:[],PPK:[],CA:[],CP:[],PP:[],
        CPL:[],CPU:[],PPL:[],PPU:[],
        D2:[0,1.128,1.693,2.059,2.326,2.534,2.704,2.847,2.970,3.078,3.173,3.258,
            3.336,3.407,3.472,3.532,3.588,3.640,3.689,3.753,3.778,3.819,3.858,3.895,3.931],
        clearArry:function(){
            af.configA.data.labels=[];
            af.configA.data.datasets=[];
            af.configA.options.title.text='';
            af.configB.data.labels=[];
            af.configB.data.datasets=[];
            af.configC.data.labels=[];
            af.configC.data.datasets=[];
            af.configC.options.scales.yAxes[0].gridLines.color=[];
            af.USL=[];af.LSL=[];af.Target=[];af.PJZ=[];
            af.CL=[];af.UCL=[];af.LCL=[];af.BZC=[];af.ZDZ=[];af.YB=[];
            af.ZXZ=[];af.JC=[];af.CPK=[];af.PPK=[];af.CA=[];af.CP=[];af.PP=[];
            af.CPL=[];af.CPU=[];af.PPL=[];af.PPU=[];
            return null;
        },
        setTableData:function(tr,th,i,number_){
            number_.sort(function(a,b){return a-b;});//求最大值、最小值
            tr.eq(i).find("td:eq("+(th+5)+")").html(af.stdDev(number_).toFixed(4));//求每一行标准差
            tr.eq(i).find("td:eq("+(th+3)+")").html(af.sum(number_).toFixed(3));//求每一行样本的平均值
            tr.eq(i).find("td:eq("+(th+6)+")").html(number_[number_.length-1]);//最大值
            tr.eq(i).find("td:eq("+(th+7)+")").html(number_[0]);//最小值
            tr.eq(i).find("td:eq("+(th+4)+")").html((number_[number_.length-1]-number_[0]).toFixed(4));//极差
            tr=null,th=null,i=null,number_=null;
            return null;
        },
        loadingChar:function(){
            af.clearArry();
            var type=$("#base-status-bar-value").val();
            if(type=="控制图"){
                $("#base-status-bar-value_parent").val()=="平均值"?type="平均值":type="极差";
            };
            var th=$("#projectTableHead tr th").length-8;
            var tr=$("#projectTable tbody tr");
            if(type=="平均值"){
                var total=0;
                for(var i=0;i<tr.length;i++){
                    var number_=[];
                    //计算当前有多少个样本
                    for(var j=2;j<(th+2);j++,total++){number_.push(Number(tr.eq(i).find("td").eq(j).text()));};
                    af.setTableData(tr,th,i,number_);//赋值到表格列中
                    af.BZC.push(af.stdDev(number_));//求所有标准差的数据
                    af.PJZ.push(af.sum(number_).toFixed(3));//求所有平均值的数据
                    af.ZDZ.push(number_[number_.length-1]);//求所有样本最大值的数据
                    af.ZXZ.push(number_[0])//求所有样本最小值的数据
                    af.JC.push(number_[number_.length-1]-number_[0])//求所有极差的数据
                    af.configA.data.labels.push(i+1);//x轴多少列
                    number_=null;
                };
                for(var i=0;i<tr.length;i++){
                    af.CL.push(af.sum(af.PJZ).toFixed(3));//CL 所有样本平均值
                    af.UCL.push((af.sum(af.PJZ)+af.stdDev(af.BZC)*3).toFixed(4))//UCL
                    af.LCL.push((af.sum(af.PJZ)-af.stdDev(af.BZC)*3).toFixed(4))//LCL
                    af.USL.push(af.USLVal);//USL
                    af.LSL.push(af.LSLVal)//LSL
                    af.Target.push(af.TargetVal)//Target
                };
                af.ZDZ.sort(function(a,b){return a-b;});//所有样本中的最大值
                af.ZXZ.sort(function(a,b){return a-b;});//所有样本值的最小值
                af.CPK.push(((af.CL[0]-af.LSL[0])/(af.sum(af.JC)*3/af.D2[th-1])).toFixed(4));//CPL
                af.CPK.push(((af.USL[0]-af.CL[0])/(af.sum(af.JC)*3/af.D2[th-1])).toFixed(4));//CPU
                af.CPK.sort(function(a,b){return a-b;});//CPK 求最大最小值
                af.PPK.push(((af.CL[0]-af.LSL[0])/(af.stdDev(af.BZC)*3)).toFixed(4));//PPL
                af.PPK.push(((af.USL[0]-af.CL[0])/(af.stdDev(af.BZC)*3)).toFixed(4));//PPU
                af.PPK.sort(function(a,b){return a-b;});//PPK 求最大最小值
                af.CA.push(((2*(Number((af.CL[0]-af.Target[0]).toString().replace('-',''))))/(af.USL[0]-af.LSL[0])).toFixed((6)));//Ca
                af.CP.push(((af.USL[0]-af.LSL[0])/(af.sum(af.JC)*6/af.D2[th-1])).toFixed((6)));//CP
                af.PP.push(((af.USL[0]-af.LSL[0])/(af.stdDev(af.BZC)*6)).toFixed(4));//PP

                af.myLineA.options.scales.yAxes[0].ticks.min=af.ZXZ[0]-0.2;

                //底部菜单显示栏
                af.configA.options.title.text="total："+total+" " +
                    "samplesize："+th+" " +
                    "groups："+tr.length+" " +
                    "max："+(af.ZDZ[af.ZDZ.length-1]==undefined?0:af.ZDZ[af.ZDZ.length-1])+" " +
                    "min："+(af.ZXZ[0]==undefined?0:af.ZXZ[0])+" " +
                    "Cpk："+(af.CPK[0])+" " +
                    "Ppk："+(af.PPK[0]==-Infinity?0:af.PPK[0])+" " +
                    "Ca："+(af.CA[0])+" " +
                    "Cp："+(af.CP[0])+" " +
                    "Pp："+(af.PP[0]==Infinity?0:af.PP[0]);
                //将准备好的数据打包成数组放到构图插件的参数中，随之更新渲染图形
                var dataArry=[];dataArry.push(af.PJZ);
                dataArry.push(af.CL);dataArry.push(af.UCL);
                dataArry.push(af.LCL);dataArry.push(af.USL);
                dataArry.push(af.LSL);dataArry.push(af.Target);
                for(var i=0;i<dataArry.length;i++){//共7条线
                    var HashMap={
                        fill:false,
                        label:af.titleArryA[i],
                        backgroundColor:af.colorArryA[i],
                        borderColor:af.colorArryA[i],
                        borderDash:[af.lineArryA[i],af.lineArryA[i]],
                        borderWidth:2,
                        pointRadius:2,
                        data:dataArry[i]
                    };
                    af.configA.data.datasets.push(HashMap);
                    HashMap=null;
                };
                dataArry=null;total=null;
                af.myLineA.update();
            }else if(type=="极差"){
                for(var i=0;i<tr.length;i++){
                    var number_=[];
                    //计算当前有多少个样本
                    for(var j=2;j<(th+2);j++){number_.push(Number(tr.eq(i).find("td").eq(j).text()));};
                    af.setTableData(tr,th,i,number_);//赋值到表格列中
                    af.JC.push(number_[number_.length-1]-number_[0])//求所有极差的数据
                    af.configA.data.labels.push(i+1);//x轴多少列
                    number_=null;
                };
                for(var i=0;i<tr.length;i++){
                    af.CL.push(af.sum(af.JC).toFixed(4));//所有极差的平均数
                    af.UCL.push((af.sum(af.JC)+af.stdDev(af.JC)*3).toFixed(4))//UCL
                    af.LCL.push((af.sum(af.JC)-af.stdDev(af.JC)*3).toFixed(4))//LCL
                };
                var dataArry=[];
                dataArry.push(af.JC);//极差
                dataArry.push(af.CL);//CL
                dataArry.push(af.UCL);//UCL
                dataArry.push(af.LCL);//LCL
                for(var i=0;i<dataArry.length;i++){//共7条线
                    var HashMap={
                        fill:false,
                        label:af.titleArryB[i],
                        backgroundColor:af.colorArryB[i],
                        borderColor:af.colorArryB[i],
                        borderDash:[af.lineArryB[i],af.lineArryB[i]],
                        borderWidth:2,
                        pointRadius:2,
                        data:dataArry[i]
                    };
                    af.configA.data.datasets.push(HashMap);
                    HashMap=null;
                };
                dataArry.sort(function(a,b){return a[0]-b[0];});
                af.myLineA.options.scales.yAxes[0].ticks.min=Number(dataArry[0][0])-0.2;
                dataArry=null;
                af.myLineA.update();
            }else if(type=="CPK分析"){
                var total=0;
                for(var i=0;i<tr.length;i++){
                    var number_=[];
                    //计算当前有多少个样本
                    for(var j=2;j<(th+2);j++,total++){
                        af.YB.push(Number(tr.eq(i).find("td").eq(j).text()));
                        number_.push(Number(tr.eq(i).find("td").eq(j).text()));
                    };
                    af.setTableData(tr,th,i,number_);//赋值到表格列中
                    af.PJZ.push(af.sum(number_).toFixed(6));//求所有平均值的数据
                    af.ZDZ.push(number_[number_.length-1]);//求所有样本最大值的数据
                    af.ZXZ.push(number_[0])//求所有样本最小值的数据
                    af.BZC.push(af.stdDev(number_));//求所有标准差的数据
                    af.JC.push(number_[number_.length-1]-number_[0])//求所有极差的数据
                    number_=null;
                };
                var k=0;
                for(var i=0;i<tr.length;i++){
                    k=k+(Math.pow((af.PJZ[i]-af.sum(af.PJZ)),2));
                    af.CL.push(af.sum(af.PJZ).toFixed(3));//CL 所有样本平均值
                    af.UCL.push((af.sum(af.PJZ)+af.stdDev(af.BZC)*3).toFixed(4))//UCL
                    af.LCL.push((af.sum(af.PJZ)-af.stdDev(af.BZC)*3).toFixed(4))//LCL
                    af.USL.push(af.USLVal);//USL
                    af.LSL.push(af.LSLVal)//LSL
                    af.Target.push(af.TargetVal)//Target
                };

                var c=0;
                for(var i=0;i<af.YB.length;i++){
                    c=c+(Math.pow((af.YB[i]-af.sum(af.PJZ)),2));
                }

                af.ZDZ.sort(function(a,b){return a-b;});//所有样本中的最大值
                af.ZXZ.sort(function(a,b){return a-b;});//所有样本值的最小值

                af.CPK.push(((af.CL[0]-af.LSL[0])/(af.sum(af.JC)*3/af.D2[th-1])).toFixed(4));//CPL
                af.CPK.push(((af.USL[0]-af.CL[0])/(af.sum(af.JC)*3/af.D2[th-1])).toFixed(4));//CPU

                af.CPL.push(af.CPK[0]);//CPL
                af.CPU.push(af.CPK[1]);//CPU

                af.CPK.sort(function(a,b){return a-b;});//CPK 求最大最小值
                af.CP.push(((af.USL[0]-af.LSL[0])/(af.sum(af.JC)*6/af.D2[th-1])).toFixed((4)));//CP

                af.CA.push(((2*(Number((af.CL[0]-af.Target[0]).toString().replace('-',''))))/(af.USL[0]-af.LSL[0])).toFixed((6)));//CA

                af.PPK.push(((af.CL[0]-af.LSL[0])/(af.stdDev(af.BZC)*3)).toFixed(4));//PPL
                af.PPK.push(((af.USL[0]-af.CL[0])/(af.stdDev(af.BZC)*3)).toFixed(4));//PPU

                af.PPL.push(af.PPK[0]);//PPL
                af.PPU.push(af.PPK[1]);//PPU

                af.PPK.sort(function(a,b){return a-b;});//PPK 求最大最小值

                af.PP.push(((af.USL[0]-af.LSL[0])/(af.stdDev(af.BZC)*6)).toFixed(4));//PP

                var dataVal=af.ZXZ[0];
                var val=Number(((af.ZDZ[af.ZDZ.length-1]-af.ZXZ[0])/5).toFixed(2));
                if(!isNaN(dataVal)&&!isNaN(af.ZDZ[af.ZDZ.length-1])){
                    af.configB.data.labels.push((dataVal).toFixed(2));//x轴多少列
                    af.configB.data.labels.push((dataVal=dataVal+val).toFixed(2));//x轴多少列
                    af.configB.data.labels.push((dataVal=dataVal+val).toFixed(2));//x轴多少列
                    af.configB.data.labels.push((dataVal=dataVal+val).toFixed(2));//x轴多少列
                    af.configB.data.labels.push((dataVal=dataVal+val).toFixed(2));//x轴多少列
                    af.configB.data.labels.push((dataVal=dataVal+val).toFixed(2));//x轴多少列
                    var aa=[];
                    for(var j=0;j<af.YB.length;j++){
                        if(af.configB.data.labels[0]-af.YB[j]>=0||Number(af.configB.data.labels[0])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[0]]==undefined){
                                aa[af.configB.data.labels[0]]=1;
                            }else{
                                aa[af.configB.data.labels[0]]=aa[af.configB.data.labels[0]]+1;
                            };
                        }else if(af.configB.data.labels[1]-af.YB[j]>=0||Number(af.configB.data.labels[1])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[1]]==undefined){
                                aa[af.configB.data.labels[1]]=1;
                            }else{
                                aa[af.configB.data.labels[1]]=aa[af.configB.data.labels[1]]+1;
                            };
                        }else if(af.configB.data.labels[2]-af.YB[j]>=0||Number(af.configB.data.labels[2])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[2]]==undefined){
                                aa[af.configB.data.labels[2]]=1;
                            }else{
                                aa[af.configB.data.labels[2]]=aa[af.configB.data.labels[2]]+1;
                            };
                        }else if(af.configB.data.labels[3]-af.YB[j]>=0||Number(af.configB.data.labels[3])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[3]]==undefined){
                                aa[af.configB.data.labels[3]]=1;
                            }else{
                                aa[af.configB.data.labels[3]]=aa[af.configB.data.labels[3]]+1;
                            };
                        }else if(af.configB.data.labels[4]-af.YB[j]>=0||Number(af.configB.data.labels[4])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[4]]==undefined){
                                aa[af.configB.data.labels[4]]=1;
                            }else{
                                aa[af.configB.data.labels[4]]=aa[af.configB.data.labels[4]]+1;
                            };
                        }else if(af.configB.data.labels[5]-af.YB[j]>=0||Number(af.configB.data.labels[5])+Number((val/2))>=af.YB[j]){
                            if(aa[af.configB.data.labels[5]]==undefined){
                                aa[af.configB.data.labels[5]]=1;
                            }else{
                                aa[af.configB.data.labels[5]]=aa[af.configB.data.labels[5]]+1;
                            };
                        };
                    };
                    var dataArry=[];
                    dataArry.push(aa[af.configB.data.labels[0]]==undefined?0:aa[af.configB.data.labels[0]]);
                    dataArry.push(aa[af.configB.data.labels[1]]==undefined?0:aa[af.configB.data.labels[1]]);
                    dataArry.push(aa[af.configB.data.labels[2]]==undefined?0:aa[af.configB.data.labels[2]]);
                    dataArry.push(aa[af.configB.data.labels[3]]==undefined?0:aa[af.configB.data.labels[3]]);
                    dataArry.push(aa[af.configB.data.labels[4]]==undefined?0:aa[af.configB.data.labels[4]]);
                    dataArry.push(aa[af.configB.data.labels[5]]==undefined?0:aa[af.configB.data.labels[5]]);
                    var HashMap=[{
                        type:'line',
                        label:'线1',
                        borderColor:'blue',
                        backgroundColor:'blue',
                        borderWidth:2,
                        fill:false,
                        data:[0,1,3,2,1,0]
                    },{
                        type:'line',
                        label:'线2',
                        borderColor:'red',
                        backgroundColor:'red',
                        borderWidth:2,
                        fill:false,
                        data:[0,2,2,1,2,0]
                    },{
                        type:'bar',
                        label:'柱形统计图',
                        backgroundColor:'rgb(192,192,192)',
                        data:dataArry,
                        borderWidth:1
                    }];
                    dataArry=null;aa=null;
                    af.configB.data.datasets.push(HashMap[0]);
                    af.configB.data.datasets.push(HashMap[1]);
                    af.configB.data.datasets.push(HashMap[2]);
                    HashMap=null;
                    af.myLineB.update();
                };
                dataVal=null;val=null;

                $(".spanVal").eq(0).html(total);total=null;//样本数
                $(".spanVal").eq(1).html(isNaN(af.sum(af.PJZ))?0:af.sum(af.PJZ).toFixed(3));//所有样本平均值
                $(".spanVal").eq(2).html(isNaN(af.ZDZ[af.ZDZ.length-1])?0:af.ZDZ[af.ZDZ.length-1]);//所有样本中的最大值
                $(".spanVal").eq(3).html(isNaN(af.ZXZ[0])?0:af.ZXZ[0]);//所有样本中的最小值

                $(".spanVal").eq(4).html(tr.length>0?th:0);//子组大小
                $(".spanVal").eq(5).html(af.USLVal);//规格上限
                $(".spanVal").eq(6).html(af.TargetVal);//目标值
                $(".spanVal").eq(7).html(af.LSLVal);//规格下限

                $(".spanVal").eq(8).html(isNaN((k/tr.length))?0:(Math.sqrt((k/tr.length))).toFixed(6));//标准差（组内）
                $(".spanVal").eq(9).html(isNaN(Math.sqrt(c/(af.YB.length-1)))?0:(Math.sqrt(c/(af.YB.length-1))).toFixed(6));//标准差（整体）

                $(".spanVal").eq(10).html(isNaN(af.CPK[0])?0:af.CPK[0]);//CPK
                $(".spanVal").eq(11).html(isNaN(af.CP[0])?0:af.CP[0]);//CP
                $(".spanVal").eq(12).html(isNaN(af.CPL[0])?0:af.CPL[0]);//CPL
                $(".spanVal").eq(13).html(isNaN(af.CPU[0])?0:af.CPU[0]);//CPU

                $(".spanVal").eq(14).html(isNaN(af.PPK[0])||af.PPK[0]==Infinity?0:af.PPK[0]);//PPK
                $(".spanVal").eq(15).html(isNaN(af.PPL[0])||af.PPL[0]==Infinity?0:af.PPL[0]);//PPL
                $(".spanVal").eq(16).html(isNaN(af.PPU[0])||af.PPU[0]==Infinity?0:af.PPU[0]);//PPU
                $(".spanVal").eq(17).html((af.PP[0]==Infinity?0:af.PP[0]));//PP
                $(".spanVal").eq(18).html(isNaN(af.CA[0])?0:af.CA[0]);//CA

            }else if(type=="样本运行图"){
                var ybArray=[];
                for(var i=0,k=1;i<tr.length;i++){//一共多少样本
                    var number_=[];
                    for(var j=2;j<(th+2);j++,k++){
                        ybArray.push(Number(tr.eq(i).find("td").eq(j).text()));
                        number_.push(Number(tr.eq(i).find("td").eq(j).text()));
                        af.configC.data.labels.push(k);
                        af.USL.push(af.USLVal);//USL
                        af.LSL.push(af.LSLVal)//LSL
                        af.Target.push(af.TargetVal)//Target
                    };
                    af.setTableData(tr,th,i,number_);
                    number_=null;
                };
                var dataArry=[];
                dataArry.push(ybArray);dataArry.push(af.USL);
                dataArry.push(af.LSL);dataArry.push(af.Target);
                ybArray=null;
                for(var i=0;i<dataArry.length;i++){
                    var HashMap={
                        fill:false,
                        label:af.titleArryYB[i],
                        backgroundColor:af.colorArryYB[i],
                        borderColor:af.colorArryYB[i],
                        borderDash:[af.lineArryYB[i],af.lineArryYB[i]],
                        borderWidth:2,
                        pointRadius:2,
                        data:dataArry[i]
                    };
                    af.configC.data.datasets.push(HashMap);
                    HashMap=null;
                };
                dataArry.sort(function(a,b){return a[0]-b[0];});
                af.myLineC.options.scales.yAxes[0].ticks.min=Number(dataArry[0][0])-0.2;
                dataArry=null;
                af.myLineC.update();
            }else if(type=="均值运行图"){
                //均值运行图
                var obj={
                    titleArryJZ:['均值运行图','USL','LSL','Target'],
                    colorArryJZ:['blue','green','green','green'],
                    lineArryJZa:[0,10,7,3],
                    lineArryJZb:[0,10,7,3]
                }
                for(var i=0;i<tr.length;i++){//一共多少样本
                    var number_=[];
                    for(var j=2;j<(th+2);j++){
                        number_.push(Number(tr.eq(i).find("td").eq(j).text()));
                    };
                    af.PJZ.push(af.sum(number_).toFixed(3));//求所有平均值的数据
                    af.USL.push(af.USLVal);//USL
                    af.LSL.push(af.LSLVal)//LSL
                    af.Target.push(af.TargetVal)//Target
                    af.configC.data.labels.push(i+1);
                    af.setTableData(tr,th,i,number_);
                    number_=null;
                };
                var dataArry=[];//一共多少线
                dataArry.push(af.PJZ);dataArry.push(af.USL);
                dataArry.push(af.LSL);dataArry.push(af.Target);
                for(var i=2;i<(th+2);i++){
                    var array=[];
                    for(var j=0;j<tr.length;j++){
                        array.push(tr.eq(j).find("td").eq(i).text());
                    };
                    dataArry.push(array);
                    obj.titleArryJZ.push("样本"+(i-1));
                    obj.colorArryJZ.push('black');
                    obj.lineArryJZa.push(0);
                    obj.lineArryJZb.push(1);
                };

                dataArry.sort(function(a,b){return a[0]-b[0];});
                af.myLineC.options.scales.yAxes[0].ticks.min=Number(dataArry[0][0])-0.2;

                for(var i=0;i<dataArry.length;i++){
                    var HashMap={
                        fill:false,
                        label:obj.titleArryJZ[i],
                        backgroundColor:obj.colorArryJZ[i],
                        borderColor:obj.colorArryJZ[i],//线的颜色
                        borderDash:[obj.lineArryJZa[i],obj.lineArryJZb[i]],//线的呈现方式
                        borderWidth:2,//线的粗细
                        pointRadius:2,//点的大小
                        data:dataArry[i]
                    };
                    af.configC.data.datasets.push(HashMap);
                    HashMap=null;
                };
                obj=null;dataArry=null;
                af.myLineC.update();
            }else if(type=="CPK趋势图"){
                af.configC.options.scales.yAxes[0].gridLines.color=['','red','green','orange',''];
                for(var i=0;i<tr.length;i++){
                    var number_=[];//计算当前有多少个样本
                    for(var j=2;j<(th+2);j++){number_.push(Number(tr.eq(i).find("td").eq(j).text()));};
                    af.setTableData(tr,th,i,number_);//赋值到表格列中
                    af.PJZ.push(af.sum(number_).toFixed(3));//求所有平均值的数据
                    af.JC.push(number_[number_.length-1]-number_[0])//求所有极差的数据
                    af.configC.data.labels.push(i+1);//x轴多少列
                    number_=null;
                };
                for(var i=0;i<tr.length;i++){
                    af.CPK.push(((af.sum(af.PJZ)-af.LSLVal)/(af.JC[i]/af.D2[th-1])).toFixed(4));//CPL
                    af.CPK.push(((af.USLVal-af.sum(af.PJZ))/(af.JC[i]/af.D2[th-1])).toFixed(4));//CPU
                    af.CPK.sort(function(a,b){return a-b;});//CPK 求最大最小值
                };

                af.myLineC.options.scales.yAxes[0].ticks.min=Number(af.CPK[0][0])-0.2;

                var HashMap={
                    fill:false,
                    label:'CPK趋势图',
                    backgroundColor:'blue',
                    borderColor:'blue',//线的颜色
                    borderDash:[0,0],//线的呈现方式
                    borderWidth:2,//线的粗细
                    pointRadius:2,//点的大小
                    data:af.CPK
                };
                af.configC.data.datasets.push(HashMap);
                HashMap=null;
                af.myLineC.update();
            }else if(type=="合格率趋势图"){
                var dataArry=[];
                af.configC.options.scales.yAxes[0].gridLines.color=['', 'green', 'orange', '', 'red', '', '', ''];
                for(var i=0;i<tr.length;i++){
                    var no=0;
                    var number_=[];
                    for(var j=2;j<(th+2);j++){
                        var ybVla=Number(tr.eq(i).find("td").eq(j).text());
                        number_.push(ybVla);
                        if(ybVla>Number(af.USLVal)
                        ||ybVla<Number(af.LSLVal)){no++;};
                        ybVla=null;
                    };
                    af.setTableData(tr,th,i,number_);
                    dataArry.push(100-(no/Number(th)*100));
                    af.configC.data.labels.push(i+1);
                };

                af.myLineC.options.scales.yAxes[0].ticks.min=0;

                var HashMap={
                    fill:false,
                    label:"合格率趋势图",
                    backgroundColor:'blue',
                    borderColor:'blue',//线的颜色
                    borderDash:[5,5],//线的呈现方式
                    borderWidth:2,//线的粗细
                    pointRadius:3,//点的大小
                    // steppedLine:true,
                    data:dataArry
                };
                af.configC.data.datasets.push(HashMap);
                dataArry=null;HashMap=null;
                af.myLineC.update();
            };
            tr=null;th=null;
            return null;
        },
        tdEvent:function(e){
            if($(e).attr("edit")=="false"){return null;};
            $(e).attr("edit","false");
            var html='<input type="number" min="1" style="height:30px;" class="form-control newInput" value="'+$(e).text()+'">';
            $(e).html(html);html=null;
            $(".newInput").focus();
            $(".newInput").blur(function(){
                $(e).attr("edit","true");
                $(e).html($(this).val());
                return null;
            });
            $(".newInput").change(function(){
                if($(e).parent().parent().attr("class")=="load"){
                    $(e).parent().parent().attr("class","update");
                };
                return null;
            });
            return null;
        },
        event:function(map){
            //日期绑定
            $(".date").datetimepicker({
                todayBtn:1,
                autoclose:true,//选择日期后自动关闭
                minView:'month',
                pickerPosition:'bottom-left',
                format:'yyyy-mm-dd hh:ii:ss',
                linkFormat:'yyyy-mm-dd hh:ii:ss'
            });
            /*
            主菜单切换按钮点击事件
            控制图、
            CPK分析、
            样本运行、
            均值运行图、
            CPK趋势图、
            合格率趋势图
            */
            $('.order').click(function(e){
                var item = $(e.target);
                $('#base-status-bar').find('div').removeClass('select');
                item.addClass('select');
                $(".base_tab").css("display", "none");
                $("#base-status-bar-value").val($(item).html());
                $("#base_tab"+$(item).attr('data')).css("display", "block");
                af.loadingChar();
            });
            /*
            附菜单切换按钮点击事件
            平均值、标准差
            */
            $('.order_parent').click(function(e){
                var item = $(e.target);
                $('#base-status-bar_parent').find('div').removeClass('select');
                item.addClass('select');
                $(".base_tab_parent").css("display", "none");
                $("#base-status-bar-value_parent").val($(item).html());
                $("#base_tab_parent"+$(item).attr('data')).css("display", "block");
                af.loadingChar();
            });
            /*
             项目文本框事件绑定
            * */
            $("#project_button").click(function(){
                $("#project_button").hide();
                var searchVal={
                    popMenu:true,
                    searchValue:'',
                    searchTable:'CCollectElementDefine',
                    searchCol:'detectionProject,prompt,id',
                    colName:'检查项目,项目描述'
                };
                COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function(result){
                    if(result){
                        $("#project_id").val(result.id);
                        $("#project_name").val(result.detectionProject);
                        af.TargetVal=0;af.USLVal=0;af.LSLVal=0;
                        searchVal={
                            popMenu:false,
                            searchValue:result.id,
                            searchTable:'CCollectElementDefineLimit',
                            searchCol:'nodeId,nodeId,targetValue,specificationsUp,specificationsDown'
                        };
                        COMMON_SEARCH.OPEN_PAGE.openPage(searchVal, function(obj){
                            af.TargetVal=obj[0].targetValue;
                            af.USLVal=obj[0].specificationsUp;
                            af.LSLVal=obj[0].specificationsDown;
                            obj=null;
                            searchVal=null;
                            $("#project_button").show();
                        });
                        result=null;
                    };
                    return null;
                });
            });
            /*
            * 表格添加一列
            * */
            $("#addCm").click(function(){
                var tr=$(this).parent().parent();
                if(this.indexCm==undefined){
                    this.indexCm=6,this.indexRow=6;
                }else{
                    this.indexCm++,this.indexRow=tr.find("th").length-7;
                };
                $(".table-bordered").css('width', ($(".table-bordered").width()+90)+'px');
                $(".table-body").css('width', ($(".table-body").width()+88)+'px');
                tr.find("th").eq(this.indexRow).after("<th class='text-center' style='width:90px;'>样式"+this.indexCm+ "" +
                    "<a href='javascript:void(0);' id='indexCm_"+this.indexCm+"' " +
                    "class='span_materialDelete glyphicon glyphicon-remove'></a></th>");
                tr=null;
                //如果当前表格没有数据时则添加一列空数据
                if($("#projectTable tbody tr").length>0){
                    var index=this.indexRow;
                    $(".addTr").each(function(){
                        $(this).find("td").eq(index).after("<td class='addInput' style='padding:0;width:90px;line-height:30px;'></td>");
                    });
                    index=null;
                    $(".addInput").unbind("click");
                    $(".addInput").click(function(){af.tdEvent(this);});
                };
                //表格删除一列
                $("#indexCm_"+this.indexCm).click(function(){
                    var index=$(this).parent().index();
                    $(this).parent().remove();
                    $("#projectTable tbody tr").each(function(){
                        $(this).find("td").eq(index).remove();
                    });
                    index=null;
                });
            });
            /**
             * 表格添加一行
             */
            $("#addRow").click(function(){
                var tr=$(this).parent().parent();
                this.i==undefined?this.i=1:this.i++;
                var td='<td style="padding:0;width:70px;line-height:30px;">'+this.i+'</td>' +
                    '<td style="padding:0;width:150px;line-height:30px;">'+(new Date()).Format("yyyy-MM-dd hh:mm:ss")+'</td>';
                var class_="addInput";
                for(var i=0;i<tr.find("th").length-2;i++){
                    var val="";
                    if(i==tr.find("th").length-8){class_="";val="正常"};
                    td+='<td class="'+class_+'" style="padding:0;width:90px;line-height:30px;">'+val+'</td>';
                    val=null;
                };
                $("#projectTable tbody").append('<tr class="addTr">'+td+'</tr>');
                class_=null;tr=null;td=null;
                $(".addInput").unbind("click");
                $(".addInput").click(function(){af.tdEvent(this);});
                return null;
            });
            /*
            *保存
             */
            $("#saveData").click(function(){af.loadingChar()});
            return null;
        }
    };
    return{
        'init':af.load
    };
});