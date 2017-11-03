package com.smtcl.machinetool.dao.impl;

import com.smtcl.machinetool.dao.*;
import org.hibernate.*;
import org.omg.Dynamic.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;

/**
 * Created by GuoFeng on 2016/1/22. TODO 通用dao实现类
 */
@Repository
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
public class DAOImpl implements IDAO{

	private static final Logger log = LoggerFactory.getLogger(DAOImpl.class);
	@Autowired
	@Qualifier("secondSessionFactory")
	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory){

		this.sessionFactory = sessionFactory;
	}

	private Session getCurrentSession(){

		return sessionFactory.getCurrentSession();
	}

	protected void initDao(){
		//do nothing
	}

	@Override
	public <T> void add(T c){

		log.debug("add " + c.toString() + " instance");
		try{
			getCurrentSession().save(c);
			log.debug("add successful");
		} catch (RuntimeException re){
			log.error("add failed", re);
			throw re;
		}
	}

	@Override
	public <T> void saveOrUpdate(T c){

		log.debug("save " + c.toString() + " instance");
		try{
			getCurrentSession().saveOrUpdate(c);
			log.debug("save or update successful");
		} catch (RuntimeException re){
			log.error("save or update failed", re);
			throw re;
		}
	}

	@Override
	public <T> void delete(T c){

		log.debug("delete " + c.toString() + " instance");
		try{
			getCurrentSession().delete(c);
			log.debug("delete successful");
		} catch (RuntimeException re){
			log.error("delete failed", re);
			throw re;
		}
	}

	@Override
	public <T> void update(T c){

		log.debug("update " + c.toString() + " instance");
		try{
			getCurrentSession().update(c);
			log.debug("update successful");
		} catch (RuntimeException re){
			log.error("update failed", re);
			throw re;
		}
	}

	@Override
	public <T> List<T> findAll(Class<T> c, Parameter... Parameters){

		log.debug("finding all " + c.toString() + " instances");
		try{
			String queryString = "from " + c.getName();
			Query  queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re){
			log.error("find all failed", re);
			throw re;
		}
	}

	@Override
	public <T> List<T> executeQuery(String hql, Parameter... Parameters){

		try{

			if (hql.indexOf("delete") == -1){

				Query queryObject = getCurrentSession().createQuery(hql);
				return queryObject.list();

			} else{

				getCurrentSession().createQuery(hql).executeUpdate();
				return null;

			}

		} catch (RuntimeException re){
			log.error("find query failed", re);
			throw re;
		}
	}

	@Override
	public <T> List<T> createSQLQuery(String sql, Parameter... Parameters){

		try{

			return getCurrentSession().createSQLQuery(sql).list();

		} catch (RuntimeException re){
			log.error("find query failed", re);
			throw re;
		}
	}

	@Override
	public <T> void sqlUpdate(String sql){
		log.debug(sql);
		try{
			getCurrentSession().createSQLQuery(sql).executeUpdate();
			log.debug("save or update successful");
		}catch (Exception re){
			log.error("save or update failed", re);
			throw re;
		}
	}
}
