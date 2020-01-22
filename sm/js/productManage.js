
let roles=getQueryVariable("roles");
$(function () {
  $("#addForm").validate();
  if(roles === 0){
    $("#toolbar").remove();
    $('table').bootstrapTable({
      url:"http://47.98.223.167:8080/sModelNew/WebMainServlet",
      method: 'post',
      pagination: true,
      search: false,
      dataType:'json',
      toolbar:'#toolbar',
      contentType: "application/x-www-form-urlencoded",
      striped:true,
      sidePagination:'server',
      pageNumber: 1,
      responseHandler:function(res){
        res.total=res.count;
        return res;
      },
      queryParams:function(params){
        return{
          str1:"workType",
          str2:params.limit,
          str3:(params.offset/params.limit)+1,
        }
      },
      pageSize:'15',
      pageList: [10, 25, 50, 100],
      showRefresh:false,
      dataField: "data",
      mobileResponsive:true,
      useRowAttrFunc: true,
      columns:[{
        field: 'name',
        title: '名称',
        sortable: true,
      },{
        field:'descript',
        title:'描述',
        sortable:true,
      }
      ]
    })

  }
  else

    $('table').bootstrapTable({
      url:"http://47.98.223.167:8080/sModelNew/WebMainServlet",
      method: 'post',
      pagination: true,
      search: false,
      dataType:'json',
      toolbar:'#toolbar',
      striped:true,
      pageSize:'20',
      pageList: [10, 25, 50, 100],
      showRefresh:false,
      dataField: "data",
      contentType: "application/x-www-form-urlencoded",
      mobileResponsive:true,
      useRowAttrFunc: true,
      sidePagination:'server',
      pageNumber: 1,
      //显示总记录条数
      responseHandler:function(res){
        res.total=res.count;
        return res;
      },
      queryParams:function(params){
        return{
          method:"getGoodsList",
          page:(params.offset/params.limit)+1,
          limit:params.limit,
        }
      },
      columns:[{
        field: 'id',
        title: '编号',
        sortable: true,
      },{
        field:'goodsName',
        title:'商品名称',
        sortable:true,
      },{
        field:'brand',
        title:'品牌',
        sortable:true,
      },{
        field:'pack_price',
        title:'盒价',
        sortable:true,
      },{
        field:'carton_price',
        title:'条价',
        sortable:true,
      },{
        field:'productionArea',
        title:'产地',
        sortable:true,
      },{
        field:'type',
        title:'类别',
        // sortable:true,
        formatter:function change_formatter(value,row,index){
          let result="";
          //console.log(row.type);
          if(row.type=="fine"){
            result="细支";
          }else if(row.type=="bead"){
            result="爆珠";
          }else if(row.type=="medium"){
            result="中支";
          }else if(row.type=="wide"){
            result="粗支";
          }
          return result;
        }
      },{
        field:'tar',
        title:'焦油含量',
        // sortable:true,
        formatter:function change_formatter(value,row,index){
          let result="";
          //console.log(row.type);
          if(row.tar=="1"){
            result="6毫克以下";
          }else if(row.tar=="2"){
            result="6到8毫克";
          }else if(row.tar=="3"){
            result="8毫克以上";
          }
          return result;
        }
      },{
        field:'null',
        title:'操作',
        formatter:actionFormatter,
      }
      ]
    });

  //模糊搜索
  $(document).on('click',"#searchButton",function () {
    let searchIn=$("#search-input").val();
    // if(searchIn){
    //   console.log("buweikong");
      
    // }else{
    //   console.log("weikong");
    // }
    $('#table').bootstrapTable('destroy')
    $('#table').bootstrapTable({
      url: "http://47.98.223.167:8080/sModelNew/WebMainServlet",
      method: 'post',
      pagination: true,
      search: false,
      dataType:'json',
      toolbar:'#toolbar',
      striped:true,
      pageSize:'5',
      pageList: [10, 25, 50, 100],
      showRefresh:false,
      dataField: "data",
      contentType: "application/x-www-form-urlencoded",
      mobileResponsive:true,
      useRowAttrFunc: true,
      sidePagination:'server',
      pageNumber: 1,
      //显示总记录条数
      responseHandler:function(res){
        res.total=res.count;
        return res;
      },
      queryParams:function(params){
        return{
          method:"getGoodsByName",
          keyword:searchIn,
          page:"0",
          limit:"0"
        }
      },
      columns:[{
        field: 'id',
        title: '编号',
        sortable: true,
      },{
        field:'goodsName',
        title:'商品名称',
        sortable:true,
      },{
        field:'brand',
        title:'品牌',
        sortable:true,
      },{
        field:'pack_price',
        title:'盒价',
        sortable:true,
      },{
        field:'carton_price',
        title:'条价',
        sortable:true,
      },{
        field:'productionArea',
        title:'产地',
        sortable:true,
      },{
        field:'type',
        title:'类别',
        // sortable:true,
        formatter:function change_formatter(value,row,index){
          let result="";
          //console.log(row.type);
          if(row.type=="fine"){
            result="细支";
          }else if(row.type=="bead"){
            result="爆珠";
          }else if(row.type=="medium"){
            result="中支";
          }else if(row.type=="wide"){
            result="粗支";
          }
          return result;
        }
      },{
        field:'tar',
        title:'焦油含量',
        // sortable:true,
        formatter:function change_formatter(value,row,index){
          let result="";
          //console.log(row.type);
          if(row.tar=="1"){
            result="6毫克以下";
          }else if(row.tar=="2"){
            result="6到8毫克";
          }else if(row.tar=="3"){
            result="8毫克以上";
          }
          return result;
        }
      },{
        field:'null',
        title:'操作',
        formatter:actionFormatter,
      }
      ]
    });
    $("#search-input").val("");
  });

  //渲染按钮
  function actionFormatter(value,row, index) {
    let id = row.id;
    delete row.ability;
    delete row.createDate;
    let result = "";
    result += "<button class='btn btn-xs btn-primary editButton' row='"+JSON.stringify(row)+"' role_id='"+id+"' title='修改'><span>修改</span></button>";
    result += "<button class='btn btn-xs btn-danger deleteButton' useFlag="+row.isUsed+" role_id="+id+" title='删除'><span>删除</span></button>";
    return result;
  }

});

//获取url中的参数
function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  query=window.atob(query);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] === variable){return pair[1];}
  }
  return(false);
}



//需要删除的属性id
let deleteRoleId;
//删除属性
$(document).on('click','.deleteButton',function () {
  let deletePrompt=$("#delete-prompt");
  //首先清空模态框的提示信息
  deletePrompt.empty();
  deleteRoleId=$(this).attr("role_id");
  $("#delete-modal").modal({
    backdrop: 'static',
  });
  //回显需要删除的属性的名称
  let roleName=$(this).parent().prev().prev().prev().prev().prev().prev().prev().text();
  //提示信息
  deletePrompt.append("您是否要删除商品:"+roleName);
});

//删除模态框确认按钮绑定事件
$(document).on('click',"#delete-confirm-button",function () {
  let useFlag=$(".deleteButton[role_id="+deleteRoleId+"]");
  if (useFlag.attr("useFlag") === "true"){
    swal(
      '删除失败!',
      '',
      'error'
      );
    $("#delete-modal").modal("hide");
  }else {
    $.ajax({
      url: "http://47.98.223.167:8080/sModelNew/WebMainServlet",
      dataType: "json",
      method:"post",
      data: {
        method:"deleteGoods",
        goodsId: deleteRoleId,
      },
      success: function (result) {
        if (result.code === 0) {
          swal(
            '删除成功!',
            result.msg,
            'success'
            );
          $("#delete-modal").modal("hide");
          //刷新表格
          $("#table").bootstrapTable('refresh');
        }else if (result.code===1){
          swal(
            '删除失败!',
            result.msg,
            'error'
            );
        }
      },
      error: function () {
        swal(
          '删除失败!',
          '网络错误',
          'error'
          );
      }
    });
  }
});

let editRoleId;
let row;
//编辑角色
$(document).on('click','.editButton',function () {
  editRoleId=$(this).attr("role_id");
  console.log(editRoleId);
  $("#updateModal").modal({
    backdrop:'static'
  });
  //清空角色信息
  //回显显示input框
  row=JSON.parse($(this).attr("row"));
  $("#upgoodsName").val(row.goodsName);
  $("#upbrand").val(row.brand);
  $("#uppack_price").val(row.pack_price);
  $("#upcarton_price").val(row.carton_price);
  $("#upproductionArea").val(row.productionArea);
  $("#uptype").val(row.type);
  $("#uptar").val(row.tar);
  $('input[name="upnewArrival"][value="'+row.newArrival+'"]').attr("checked", true);
  $("#upmodelFileName").val(row.modelFileName);
  $("#upmainImg").val("");
  $("#upcropedBigImg").attr("src",row.mainImg);
  // echo("upcropedBigImg",row.mainImg);
  $("#updetailImg1").val("");
  $("#upcropedBigImg1").attr("src",row.detailImg1);
  $("#updetailImg2").val("");
  $("#upcropedBigImg2").attr("src",row.detailImg2);
  $("#updetailImg3").val("");
  $("#upcropedBigImg3").attr("src",row.detailImg3);
  $("#updetailImg4").val("");
  $("#upcropedBigImg4").attr("src",row.detailImg4);
  $("#updetailImg5").val("");
  $("#upcropedBigImg5").attr("src",row.detailImg5);

});
//图片回显
// function echo(name,src) {
//     var reader=new FileReader();
//     reader.onload=function(e){
//       $("#"+name).attr("src",e.target.result);
//     }
// }
//编辑模态框保存按钮绑定事件
$(document).on('click','#updateStaffButton',function () {
  //修改
  var upfd=new FormData();
  // console.log($("#upmethod").val());
  // console.log(editRoleId);
  // console.log($("#upgoodsName").val());
  // console.log($("#upbrand").val());
  // console.log($("#uppack_price").val());
  // console.log($("#upcarton_price").val());
  // console.log($("#upproductionArea").val());
  // console.log($("#uptype option:selected").val());
  // console.log($("#uptar option:selected").val());
  // console.log($("input[name='upnewArrival']:checked").val());
  // console.log($("#upmainImg").get(0).files[0]);
  // console.log($("#updetailImg1").get(0).files[0]);
  // console.log($("#updetailImg2").get(0).files[0]);
  // console.log($("#updetailImg3").get(0).files[0]);
  // console.log($("#updetailImg4").get(0).files[0]);
  // console.log($("#updetailImg5").get(0).files[0]);
  // console.log($("#upmodel").get(0).files[0]);upmodelFileName
  upfd.append("method", $("#upmethod").val());
  upfd.append("goodsId", editRoleId);
  upfd.append("goodsName", $("#upgoodsName").val());
  upfd.append("brand", $("#upbrand").val());
  upfd.append("pack_price", $("#uppack_price").val());
  upfd.append("carton_price", $("#upcarton_price").val());
  upfd.append("productionArea", $("#upproductionArea").val());
  upfd.append("type", $("#uptype option:selected").val());
  upfd.append("tar", $("#uptar option:selected").val());
  upfd.append("newArrival", $("input[name='upnewArrival']:checked").val());
  upfd.append("modelFileName", $("#upmodelFileName").val());
  if($("#upmainImg").get(0).files[0]){
    upfd.append("mainImg", $("#upmainImg").get(0).files[0]);
  }else{
    upfd.append("mainImg", row.mainImg);
  }
  // upfd.append("detailImg1", $("#updetailImg1").get(0).files[0]);
  // upfd.append("detailImg2", $("#updetailImg2").get(0).files[0]);
  // upfd.append("detailImg3", $("#updetailImg3").get(0).files[0]);
  // upfd.append("detailImg4", $("#updetailImg4").get(0).files[0]);
  if($("#updetailImg1").get(0).files[0]){
    upfd.append("detailImg1", $("#updetailImg1").get(0).files[0]);
  }else{
    upfd.append("detailImg1", row.detailImg1);
  }
  if($("#updetailImg2").get(0).files[0]){
    upfd.append("detailImg2", $("#updetailImg2").get(0).files[0]);
  }else{
    upfd.append("detailImg2", row.detailImg2);
  }
  if($("#updetailImg3").get(0).files[0]){
    upfd.append("detailImg3", $("#updetailImg3").get(0).files[0]);
  }else{
    upfd.append("detailImg3", row.detailImg3);
  }
  if($("#updetailImg4").get(0).files[0]){
    upfd.append("detailImg4", $("#updetailImg4").get(0).files[0]);
  }else{
    upfd.append("detailImg4", row.detailImg4);
  }
  if($("#updetailImg5").get(0).files[0]){
    upfd.append("detailImg5", $("#updetailImg5").get(0).files[0]);
  }else{
    upfd.append("detailImg5", row.detailImg5);
  }
  
  $.ajax({
    url: "http://47.98.223.167:8080/sModelNew/WebUploadServlet",
    method: 'POST',
    data: upfd,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (result) {
      if(result.code===0){
        swal(
          '修改成功!',
          result.msg,
          'success'
          );
        $("#updateModal").modal("hide");
        $("#table").bootstrapTable('refresh');
      }else if(result.code===1){
        swal(
          '添加失败!',
          result.msg,
          'error'
          );
      }
    }
  })
});

// //主图的点击事件
//主图的file选择文件事件
$(document).on('change','#mainImg',function () {

  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// //详情图一
$(document).on('change','#detailImg1',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg1").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// //详情图2
$(document).on('change','#detailImg2',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg2").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图3
$(document).on('change','#detailImg3',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg3").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图4
$(document).on('change','#detailImg4',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg4").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图5
$(document).on('change','#detailImg5',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#cropedBigImg5").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// $(document).on('change','#model',function () {
//   var video = this.files[0];
//   // var url = URL.createObjectURL(video);
//   // console.log(url);
//   // $("#aa").src=url;
//   if(video){
//     var reader=new FileReader();
//     reader.onload=function(e){
//       $("#video").attr("src",e.target.result);
//     }
//     reader.readAsDataURL(video);
//   }
// });


$(document).on('click',"#addStaffButton",function () {
  var fd= new FormData();
  // console.log($("#method").val());
  // console.log($("#goodsName").val());
  // console.log($("#brand").val());
  // console.log($("#pack_price").val());
  // console.log($("#carton_price").val());
  // console.log($("#productionArea").val());
  // console.log($("#type option:selected").val());
  // console.log($("#tar option:selected").val());
  // console.log($("input[name='newArrival']:checked").val());
  // console.log($("#mainImg").get(0).files[0]);
  // console.log($("#detailImg1").get(0).files[0]);
  // console.log($("#detailImg2").get(0).files[0]);
  // console.log($("#detailImg3").get(0).files[0]);
  // console.log($("#detailImg4").get(0).files[0]);
  // console.log($("#detailImg5").get(0).files[0]);
  // console.log($("#model").get(0).files[0]);
  fd.append("method", $("#method").val());
  fd.append("goodsName", $("#goodsName").val());
  fd.append("brand", $("#brand").val());
  fd.append("pack_price", $("#pack_price").val());
  fd.append("carton_price", $("#carton_price").val());
  fd.append("productionArea", $("#productionArea").val());
  fd.append("type", $("#type option:selected").val());
  fd.append("tar", $("#tar option:selected").val());
  fd.append("newArrival", $("input[name='newArrival']:checked").val());
  fd.append("modelFileName", $("#modelFileName").val());
  fd.append("mainImg", $("#mainImg").get(0).files[0]);
  fd.append("detailImg1", $("#detailImg1").get(0).files[0]);
  fd.append("detailImg2", $("#detailImg2").get(0).files[0]);
  fd.append("detailImg3", $("#detailImg3").get(0).files[0]);
  fd.append("detailImg4", $("#detailImg4").get(0).files[0]);
  fd.append("detailImg5", $("#detailImg5").get(0).files[0]);
  $.ajax({
    url: "http://47.98.223.167:8080/sModelNew/WebUploadServlet",
    method: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function (result) {
      console.log("come in!");
      if(result.code===0){
        swal(
          '添加成功!',
          result.msg,
          'success'
          );
        $("#addModal").modal("hide");
        $("#table").bootstrapTable('refresh');
      }else if(result.code===1){
        swal(
          '添加失败!',
          result.msg,
          'error'
          );
      }
    }
  })
});


//添加模态框
$(document).on('click',"#add-a",function () {
  $("#addModal").modal({
    backdrop:'static'
  });
  //清空输入框upmodelFileName
  $("#goodsName").val("");
  $("#brand").val("");
  $("#pack_price").val("");
  $("#carton_price").val("");
  $("#productionArea").val("");
  $("#type").val("");
  $("#tar").val("");
  $('input[name="newArrival"]').attr("checked", false);
  $("#modelFileName").val("");
  $("#mainImg").val("");
  $("#detailImg1").val("");
  $("#detailImg2").val("");
  $("#detailImg3").val("");
  $("#detailImg4").val("");
  $("#detailImg5").val("");
  // $("#model").val("");
  $('img[class="img-thumbnail"]').attr("src","img/添加图片.png")
});



//主图的file选择文件事件
$(document).on('change','#upmainImg',function () {

  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// //详情图一
$(document).on('change','#updetailImg1',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg1").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// //详情图2
$(document).on('change','#updetailImg2',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg2").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图3
$(document).on('change','#updetailImg3',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg3").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图4
$(document).on('change','#updetailImg4',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg4").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
// //详情图5
$(document).on('change','#updetailImg5',function () {
  var file=this.files[0];
  if(this.files && file){
    var reader=new FileReader();
    reader.onload=function(e){
      $("#upcropedBigImg5").attr("src",e.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// $(document).on('change','#upmodel',function () {
//   var video = this.files[0];
//   // var url = URL.createObjectURL(video);
//   // console.log(url);
//   // $("#aa").src=url;
//   if(video){
//     var reader=new FileReader();
//     reader.onload=function(e){
//       $("#upvideo").attr("src",e.target.result);
//     }
//     reader.readAsDataURL(video);
//   }
// });











