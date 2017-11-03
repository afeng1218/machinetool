package com.smtcl.machinetool.service.impl;

import com.smtcl.machinetool.dao.*;
import com.smtcl.machinetool.service.*;
import org.json.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/4/18.
 */
@Service
public class CommonSearchPageService implements ICommonSearchPageService{

	@Autowired
	IGenericDAO dao;

	@Override
	public List commonSearch(String condition){

		/*查询条件解析*/
		JSONObject upload = new JSONObject(condition);
		//String     type        = upload.getString("type");
		String   searchVal   = upload.getString("searchValue");
		String   searchTable = upload.getString("searchTable");
		String[] searchCol   = upload.getString("searchCol").split(",");
		String[] replaceCol  = new String[searchCol.length];
		String   hql         = "";

		for (int i = 0; i < searchCol.length; i++){

			replaceCol[i] = searchCol[i].replaceAll("\\.", "_");
		}

		if (searchCol.length > 2){

			hql += "select new Map(st." + searchCol[0] + " as " + replaceCol[0] + " ,st." +
					searchCol[1] + " as " + replaceCol[1];

			for (int i = 2; i < searchCol.length; i++){

				if (i == (searchCol.length - 1)){

					hql += ",st." + searchCol[i] + " as " + replaceCol[i] + ")";

				} else{

					hql += ",st." + searchCol[i] + " as " + replaceCol[i] + "";

				}
			}

		} else if (searchCol.length == 2){

			hql += "select new Map(st." + searchCol[0] + " as " + replaceCol[0] + ",st." + searchCol[1] + " as " +
					replaceCol[1] + ")";

		} else if (searchCol.length == 1){

			hql += "select new Map(st." + searchCol[0] + " as " + replaceCol[0] + ")";
		}

		hql += " from " + searchTable + " st ";

		/**
		 * 如果有searchColNum字段就更具searchColNum添加查询条件，没有则按照默认规则添加条件
		 */
		if (upload.has("searchColNum")){

			String searchColNum  = upload.getString("searchColNum");
			String colNumArray[] = searchColNum.split(",");

			Integer startNum = Integer.parseInt(colNumArray[0]);
			Integer endNum   = Integer.parseInt(colNumArray[1]);
			hql += " where (";

			for (int i = 0; i < endNum; i++){

				if (i == (endNum - 1)){

					if (searchVal.indexOf("%") != -1){

						hql += " st." + searchCol[startNum + i] + " like '" + searchVal + "' )";

					} else{

						hql += " st." + searchCol[startNum + i] + "='" + searchVal + "' )";
					}

				} else{

					if (searchVal.indexOf("%") != -1){

						hql += " st." + searchCol[startNum + i] + " like '" + searchVal + "'" + " or ";

					} else{

						hql += " st." + searchCol[startNum + i] + "='" + searchVal + "'" + " or ";

					}

				}

			}

		} else{

			if (searchCol.length >= 2){

				if (searchVal.indexOf("%") != -1){

					hql += " where (st." + searchCol[0] + " like '" + searchVal + "' " +
							" or st." + searchCol[1] + " like '" + searchVal + "')";
				} else{

					hql += " where (st." + searchCol[0] + "='" + searchVal + "' " +
							" or st." + searchCol[1] + "='" + searchVal + "')";
				}

			} else{

				if (searchVal.indexOf("%") != -1){

					hql += " where st." + searchCol[0] + " like '" + searchVal + "' ";
				} else{

					hql += " where st." + searchCol[0] + "='" + searchVal + "' ";
				}

			}

		}

		/**
		 * 判断是否有追加条件
		 */
		if (upload.has("addLimit")){

			JSONArray addLimit = upload.getJSONArray("addLimit");
			for (int i = 0; i < addLimit.length(); i++){

				String name  = addLimit.getJSONObject(i).getString("colName");
				String value = addLimit.getJSONObject(i).getString("colValue");

				if (value.indexOf("%") == -1){

					hql += " and st." + name + " = '" + value + "' ";

				} else{

					hql += " and st." + name + " like '" + value + "' ";

				}
			}

		}
		return dao.executeQuery(hql);

	}
}
