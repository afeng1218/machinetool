package com.smtcl;

import java.sql.Timestamp;

import com.smtcl.machinetool.*;
import com.smtcl.machinetool.dao.*;
import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;

import com.smtcl.machinetool.models.machinetool.CProcessProcedureVersion;
import org.springframework.transaction.annotation.*;
import org.springframework.transaction.interceptor.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Main.class)
@WebAppConfiguration
public class MachineToolApplicationTests{

	@Autowired
	IGenericDAO dao;

	@Test
	@Transactional
	public void contextLoads() throws Exception{

		CProcessProcedureVersion temp = new CProcessProcedureVersion();
		Timestamp                ss   = new Timestamp(System.currentTimeMillis());

		temp.setApprover("11111111111");
		temp.setApproveTime(ss);
		temp.setCreatePerson("createPerson");
		temp.setCreateTime(ss);
		temp.setProcessVersion("processVersion");
		temp.setUpdatePerson("updatePerson");
		temp.setUpdateTime(ss);

		dao.saveOrUpdate(temp);

		temp.setApprover("2222222222222222222222222222222");
		dao.saveOrUpdate(temp);

	}

}
