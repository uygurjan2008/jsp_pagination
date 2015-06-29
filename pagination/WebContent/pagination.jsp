<%@page import="java.util.LinkedHashMap"%>
<%@page import="java.util.Map"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%> 
<%@page import="net.sf.json.JSONObject"%>
<%@ page language="java" contentType="application/json; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String tablename = "userblog";
	int pagesize = 15;
	int index = 1;
	if (request.getParameter("tablename") != null) {
		tablename = request.getParameter("tablename");
	}
	if (request.getParameter("pagesize") != null) {
		pagesize = Integer.valueOf(request.getParameter("pagesize"));
	}
	if (request.getParameter("i") != null) {
		index = Integer.valueOf(request.getParameter("i"));
	}
	String limit = (index - 1) * pagesize + "," + pagesize;
	String sql = "SELECT * FROM " + tablename + " LIMIT " + limit;
	String sql1 = "describe " + tablename;
	String sql2 = "SELECT count(*) FROM " + tablename;
	
	Connection conn = null;
	Statement stmt = null;
	try {
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager
				.getConnection(
						"jdbc:mysql://localhost:3306/databasename?useUnicode=true&characterEncoding=utf8",
						"root", "root");
		
		stmt = conn.createStatement();
		ResultSet rs1 = stmt.executeQuery(sql1);
		String field = "";
		while (rs1.next()) {
			field += rs1.getString(1) + ",";
		}
		String[] s = field.split(",");
		Statement stmt1 = conn.createStatement();
		List<Object> l = new ArrayList<Object>();
		Map<String, String> map = new LinkedHashMap<String, String>();
		JSONArray array = new JSONArray();
		ResultSet rs = stmt1.executeQuery(sql);
		while (rs.next()) {
			for (int i = 0; i < s.length; i++) {
				map.put(s[i], rs.getString(s[i]));
			}
			array.add(map);
		}
		Statement stmt2 = conn.createStatement();
		ResultSet rs2 = stmt2.executeQuery(sql2);
		int count = 0;
		while (rs2.next()) {
			count = Integer.valueOf(rs2.getString(1));
		}
		JSONArray ja = array;
		JSONArray ja1 = new JSONArray();
		JSONObject jo = new JSONObject();
		JSONObject jo1 = new JSONObject();
		jo.put("totalItem", count);
		double pages_length = Math.ceil(count / pagesize);
        jo.put("totalPage", String.valueOf(pages_length));
		ja1.add(jo);
		jo1.put("items", ja);
		jo1.put("pagination", ja1);
		jo1.write(out);
	} catch (Exception e) {
		out.print(e.getMessage());
	}
	stmt.close();
	conn.close();
%>