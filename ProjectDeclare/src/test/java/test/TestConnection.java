package test;

import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.sql.DataSource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

public class TestConnection {
	public static void main(String[] args) throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		DataSourceTransactionManager manger =(DataSourceTransactionManager) context.getBean("transactionManager");
		DataSource dataSource = (DataSource) context.getBean("dataSource");
		Connection connection = dataSource.getConnection();
		PreparedStatement prepareStatement = connection.prepareStatement("select * from sys_user");
		prepareStatement.executeQuery();
	}
}
