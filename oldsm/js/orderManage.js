let roles=getQueryVariable("roles");
$(function () {
  $("#addForm").validate();
  if(roles === 0){
    
    $('#table').bootstrapTable({
      url:url + "/dataDict/getDict.action",
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
    $('#table').bootstrapTable({
      url:url,
      method: 'post',
      pagination: true,
      search: false,
      dataType:'json',
      toolbar:'#toolbar',
      striped:true,
      pageSize:'15',
      pageList: [10, 25, 50, 100],
      showRefresh:false,
      dataField: "data",
      contentType: "application/x-www-form-urlencoded",
      mobileResponsive:true,
      useRowAttrFunc: true,
      sidePagination:'server',
      pageNumber: 1,
      queryParams:function(params){
        return{
          method:"getOrders",
          page:(params.offset/params.limit)+1,
          limit:params.limit,
        }
      },
      columns:[{
        field: 'orderId',
        title: '订单编号',
        sortable: true,
      },{
        field:'payTime',
        title:'支付时间',
        sortable:true,
      },{
        field:'sum',
        title:'总金额',
        sortable:true,
      },{
        field:'payType',
        title:'支付方式',
        sortable:true,
      },{
        field:'payer',
        title:'支付人',
        sortable:true,
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
    $('#table').bootstrapTable('destroy')
    $('#table').bootstrapTable({
      url: url,
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
      sidePagination:'client',
      pageNumber: 1,
      queryParams:function(params){
        return{
          method:"searchOrders",
          keyword:searchIn,
          // page:(params.offset/params.limit)+1,
          // limit:params.limit,
          page:"0",
          limit:"0"
        }
      },
      columns:[{
        field: 'orderId',
        title: '订单编号',
        sortable: true,
      },{
        field:'payTime',
        title:'支付时间',
        sortable:true,
      },{
        field:'sum',
        title:'总金额',
        sortable:true,
      },{
        field:'payType',
        title:'支付方式',
        sortable:true,
      },{
        field:'payer',
        title:'支付人',
        sortable:true,
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
    let id = row.orderId;
    delete row.ability;
    delete row.createDate;
    let result = "";
    result += "<button class='btn btn-xs btn-primary editButton'orderDetail='"+JSON.stringify(row)+"'    role_id='"+id+"' title='详情'><span>详情</span></button>";
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
  let roleName=$(this).parent().prev().prev().prev().prev().prev().text();
  //提示信息
  deletePrompt.append("您是否要删除订单:"+roleName);
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
      url: url,
      dataType: "json",
      data: {
        method: "deleteOrders",
        orderId:deleteRoleId,
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





//详情
let editRoleId;
//编辑角色
$(document).on('click','.editButton',function () {
  //清空
  $("#orderNum").text("");
  $("#payTime").text("");
  $("#total").text("");
  $("#payWay").text("");
  $("#payer").text("");
  $("#table_detail").bootstrapTable('destroy');
  editRoleId=$(this).attr("role_id");
  var orderDetail=$.parseJSON($(this).attr("orderDetail"));;
  
  $("#detail-modal").modal({
    backdrop:'static'
  });
  //获取详情信息
  $.ajax({
    url:url,
    dataType:"json",
    async:false,
    data:{
      method:"getOrderDetail",
      orderId:editRoleId,
    },
    success:function(result){
      if (result.code === 0) {
          //显示
          console.log(result.data);
          var data=result.data;
          console.log(orderDetail);
          $("#orderNum").text(orderDetail.orderId);
          $("#payTime").text(orderDetail.payTime);
          $("#total").text(orderDetail.sum);
          $("#payWay").text(orderDetail.payType);
          $("#payer").text(orderDetail.payer);
          //生成表格
          $('#table_detail').bootstrapTable({
            data: data,
            dataType:'json',
            striped:true,
            pageSize:'5',
            pageList: [10, 25, 50, 100],
            contentType: "application/x-www-form-urlencoded",
            mobileResponsive:true,
            useRowAttrFunc: true,
            columns:[
            {
              field:'id',
              title:'编号',
              sortable:true,
            },{
              field:'goodsName',
              title:'商品名称',
              sortable:true,
            },{
              field:'unit',
              title:'单位',
              formatter:function change_formatter(value,row,index){
                console.log(row.unit);
                let result="";
                if(row.unit=="pack"){
                  result="盒";
                }else if(row.unit=="carton"){
                  result="条";
                }
                return result;
              }
            },{
              field:'unitPrice',
              title:'单价',
              sortable:true,
            },{
              field:'count',
              title:'数量',
              sortable:true,
            },{
              field:'subtotal',
              title:'小计',
              sortable:true,
            }]
          });
        }else if (result.code === 1) {
          swal(
            '获取失败!',
            '网络错误',
            'error'
            );
          $("#updateModal").modal("hide");
        }
      },
      error:function () {
        swal(
          '获取失败!',
          '网络错误',
          'error'
          );
      }
    });
});






























