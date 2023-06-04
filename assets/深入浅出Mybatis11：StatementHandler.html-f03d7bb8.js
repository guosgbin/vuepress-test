import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as t}from"./app-88c518aa.js";const e="/assets/StatementHandler类图-375e3f83.png",p={},c=t('<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2021年6月18日08:56:56</td></tr></tbody></table><p>摘要：本篇主要讲StatementHandler的四大对象的StatementHandler，在Mybatis中到底是如何使用的。</p><h2 id="jdk的statement" tabindex="-1"><a class="header-anchor" href="#jdk的statement" aria-hidden="true">#</a> JDK的Statement</h2><p>在JDK的java.sql包下有一个Statement接口，它是用于执行静态SQL语句并返回结果的对象，一般都是返回ResultSet作为结果。</p><p>Statement接口有一个子接口PreparedStatement，PreparedStatement也有一个子接口CallableStatement。</p><p>它们的作用分别是:</p><ol><li>Statement提供一些执行SQL的基本方法。</li><li>PreparedStatement新增了一些set方法，可以使用预编译执行SQL。</li><li>CallableStatement用于处理存储过程。</li></ol><p>正是由于JDK中有这三种Statement接口，所以Mybatis会存在针对这三种不同的Statement做不同的处理。</p><h2 id="statementhandler" tabindex="-1"><a class="header-anchor" href="#statementhandler" aria-hidden="true">#</a> StatementHandler</h2><h3 id="继承关系" tabindex="-1"><a class="header-anchor" href="#继承关系" aria-hidden="true">#</a> 继承关系</h3><p>Mybatis中有三种StatementHandler：分别是SimpleStatementHandler，PreparedStatementHandler和CallableStatementHandler，分别和JDK在的三种对应。</p><p>继承关系如下：</p><img src="'+e+`" alt="StatementHandler类图" style="zoom:67%;"><p><strong>BaseStatementHandler</strong>是下面三种处理器的基类，使用模板模式抽取了一些公用的代码。</p><p><strong>RoutingStatementHandler</strong>从名字就可以看出它是用于路由到指定StatementHandler的一个类。</p><p><strong>SimpleStatementHandler</strong>：简单处理器。</p><p><strong>PreparedStatementHandler</strong>：提供预编译功能。</p><p><strong>CallableStatementHandler</strong>：用于存储过程。</p><h3 id="statementhandler-1" tabindex="-1"><a class="header-anchor" href="#statementhandler-1" aria-hidden="true">#</a> StatementHandler</h3><p>StatementHandler接口提供了一些API</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">StatementHandler</span> <span class="token punctuation">{</span>

  <span class="token doc-comment comment">/**
   * 创建一个Statement对象
   */</span>
  <span class="token class-name">Statement</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">,</span> <span class="token class-name">Integer</span> transactionTimeout<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * 设置参数
   */</span>
  <span class="token keyword">void</span> <span class="token function">parameterize</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * 批处理
   */</span>
  <span class="token keyword">void</span> <span class="token function">batch</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * 更新
   */</span>
  <span class="token keyword">int</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Cursor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">queryCursor</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">)</span>
      <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

  <span class="token class-name">BoundSql</span> <span class="token function">getBoundSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token class-name">ParameterHandler</span> <span class="token function">getParameterHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="basestatementhandler" tabindex="-1"><a class="header-anchor" href="#basestatementhandler" aria-hidden="true">#</a> BaseStatementHandler</h3><p>BaseStatementHandler是其他三个处理器的基类，使用模板模式将prepare方法的主体流程定义了，由子类去实现自己独有的功能。</p><p>prepare作用是从Connection中获取Statement对象，共性内容有，设置查询的超时时间，设置数据大小限制等。</p><p>源码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Statement</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">,</span> <span class="token class-name">Integer</span> transactionTimeout<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">ErrorContext</span><span class="token punctuation">.</span><span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sql</span><span class="token punctuation">(</span>boundSql<span class="token punctuation">.</span><span class="token function">getSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Statement</span> statement <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        statement <span class="token operator">=</span> <span class="token function">instantiateStatement</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置查询超时时间</span>
        <span class="token function">setStatementTimeout</span><span class="token punctuation">(</span>statement<span class="token punctuation">,</span> transactionTimeout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setFetchSize</span><span class="token punctuation">(</span>statement<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> statement<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SQLException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">closeStatement</span><span class="token punctuation">(</span>statement<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">closeStatement</span><span class="token punctuation">(</span>statement<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ExecutorException</span><span class="token punctuation">(</span><span class="token string">&quot;Error preparing statement.  Cause: &quot;</span> <span class="token operator">+</span> e<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>instantiateStatement()</code>方法是抽象方法，需要由子类去实现。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token class-name">Statement</span> <span class="token function">instantiateStatement</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="preparedstatementhandler" tabindex="-1"><a class="header-anchor" href="#preparedstatementhandler" aria-hidden="true">#</a> PreparedStatementHandler</h3><p>由于实际上我们写SQL使用预编译的方式时最多的，所以拿PreparedStatementHandler为例。</p><p>PreparedStatementHandler的<code>instantiateStatement()</code>方法，最终会生产一个PreparedStatement对象。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token class-name">Statement</span> <span class="token function">instantiateStatement</span><span class="token punctuation">(</span><span class="token class-name">Connection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取真正能执行的SQL，可能还有?占位符</span>
    <span class="token class-name">String</span> sql <span class="token operator">=</span> boundSql<span class="token punctuation">.</span><span class="token function">getSql</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 根据不同的情况生产PreparedStatement对象</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mappedStatement<span class="token punctuation">.</span><span class="token function">getKeyGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">instanceof</span> <span class="token class-name">Jdbc3KeyGenerator</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyColumnNames <span class="token operator">=</span> mappedStatement<span class="token punctuation">.</span><span class="token function">getKeyColumns</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>keyColumnNames <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token class-name">PreparedStatement</span><span class="token punctuation">.</span><span class="token constant">RETURN_GENERATED_KEYS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> keyColumnNames<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>mappedStatement<span class="token punctuation">.</span><span class="token function">getResultSetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">ResultSetType</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">prepareStatement</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> mappedStatement<span class="token punctuation">.</span><span class="token function">getResultSetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ResultSet</span><span class="token punctuation">.</span><span class="token constant">CONCUR_READ_ONLY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在执行一次SQL时，假如使用了二级缓存则先回走二级缓存（CachingExecutor），再走一级缓存（BaseExecutor）,最后会走到三个执行器，例如SimpleExecutor。</p><p>还要一个重要的方法就是<code>parameterize()</code>，它是通过ParameterHandler去设置预编译参数的，后面讲ParameterHandler再说。</p><h2 id="执行器中statementhandler相关" tabindex="-1"><a class="header-anchor" href="#执行器中statementhandler相关" aria-hidden="true">#</a> 执行器中StatementHandler相关</h2><p>SimpleExecutor的<code>doQuery()</code>方法如下，</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">doQuery</span><span class="token punctuation">(</span><span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameter<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">,</span> <span class="token class-name">BoundSql</span> boundSql<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">Statement</span> stmt <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Configuration</span> configuration <span class="token operator">=</span> ms<span class="token punctuation">.</span><span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获得语句处理对象</span>
        <span class="token class-name">StatementHandler</span> handler <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">newStatementHandler</span><span class="token punctuation">(</span>wrapper<span class="token punctuation">,</span> ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获得连接 设置参数等</span>
        stmt <span class="token operator">=</span> <span class="token function">prepareStatement</span><span class="token punctuation">(</span>handler<span class="token punctuation">,</span> ms<span class="token punctuation">.</span><span class="token function">getStatementLog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 原生statement直接执行				</span>
        <span class="token keyword">return</span> handler<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>stmt<span class="token punctuation">,</span> resultHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token function">closeStatement</span><span class="token punctuation">(</span>stmt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会先通过Configuration的<code>newStatementHandler()</code>方法去创建一个StatementHandler，将创建StatementHandler放在Configuration中，就是一个工厂模式，统一管理，其实就是为了方便增加拦截器的操作。</p><p>不止是创建StatementHandler，其他的一些对象也是在Configuration中创建的，例如Executor、ResultSetHandler、ParameterHandler。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">StatementHandler</span> <span class="token function">newStatementHandler</span><span class="token punctuation">(</span><span class="token class-name">Executor</span> executor<span class="token punctuation">,</span> <span class="token class-name">MappedStatement</span> mappedStatement<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameterObject<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">,</span> <span class="token class-name">BoundSql</span> boundSql<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">StatementHandler</span> statementHandler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RoutingStatementHandler</span><span class="token punctuation">(</span>executor<span class="token punctuation">,</span> mappedStatement<span class="token punctuation">,</span> parameterObject<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
    statementHandler <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">StatementHandler</span><span class="token punctuation">)</span> interceptorChain<span class="token punctuation">.</span><span class="token function">pluginAll</span><span class="token punctuation">(</span>statementHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> statementHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>RoutingStatementHandler类的作用就是根据MappedStatement对象的StatementType类型来创建不同的处理器。</p><p>Mybatis默认是PREPARED类型。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">RoutingStatementHandler</span><span class="token punctuation">(</span><span class="token class-name">Executor</span> executor<span class="token punctuation">,</span> <span class="token class-name">MappedStatement</span> ms<span class="token punctuation">,</span> <span class="token class-name">Object</span> parameter<span class="token punctuation">,</span> <span class="token class-name">RowBounds</span> rowBounds<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">,</span> <span class="token class-name">BoundSql</span> boundSql<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据语句类型选择被代理对象</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>ms<span class="token punctuation">.</span><span class="token function">getStatementType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token constant">STATEMENT</span><span class="token operator">:</span>
        delegate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleStatementHandler</span><span class="token punctuation">(</span>executor<span class="token punctuation">,</span> ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token constant">PREPARED</span><span class="token operator">:</span>
        delegate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PreparedStatementHandler</span><span class="token punctuation">(</span>executor<span class="token punctuation">,</span> ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token constant">CALLABLE</span><span class="token operator">:</span>
        delegate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CallableStatementHandler</span><span class="token punctuation">(</span>executor<span class="token punctuation">,</span> ms<span class="token punctuation">,</span> parameter<span class="token punctuation">,</span> rowBounds<span class="token punctuation">,</span> resultHandler<span class="token punctuation">,</span> boundSql<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ExecutorException</span><span class="token punctuation">(</span><span class="token string">&quot;Unknown statement type: &quot;</span> <span class="token operator">+</span> ms<span class="token punctuation">.</span><span class="token function">getStatementType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在创建好PreparedStatementHandler对象之后，会调用<code>prepareStatement()</code>方法去做设置参数，执行SQL等操作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Statement</span> <span class="token function">prepareStatement</span><span class="token punctuation">(</span><span class="token class-name">StatementHandler</span> handler<span class="token punctuation">,</span> <span class="token class-name">Log</span> statementLog<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
  <span class="token class-name">Statement</span> stmt<span class="token punctuation">;</span>
  <span class="token class-name">Connection</span> connection <span class="token operator">=</span> <span class="token function">getConnection</span><span class="token punctuation">(</span>statementLog<span class="token punctuation">)</span><span class="token punctuation">;</span>
  stmt <span class="token operator">=</span> handler<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> transaction<span class="token punctuation">.</span><span class="token function">getTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  handler<span class="token punctuation">.</span><span class="token function">parameterize</span><span class="token punctuation">(</span>stmt<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> stmt<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于PreparedStatementHandler的<code>parameterize()</code>方法主要是设置参数的，后面讲。</p><p>设置完参数后，回到SimpleExecutor的<code>doQuery()</code>，直接调用PreparedStatementHandler的<code>query()</code>方法执行SQL，返回结果集。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token class-name">Statement</span> statement<span class="token punctuation">,</span> <span class="token class-name">ResultHandler</span> resultHandler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">SQLException</span> <span class="token punctuation">{</span>
    <span class="token class-name">PreparedStatement</span> ps <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">PreparedStatement</span><span class="token punctuation">)</span> statement<span class="token punctuation">;</span>
    <span class="token comment">// 执行真正的查询，查询完成后，结果就在ps中了</span>
    ps<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 由resultSetHandler继续处理结果</span>
    <span class="token keyword">return</span> resultSetHandler<span class="token punctuation">.</span><span class="token function">handleResultSets</span><span class="token punctuation">(</span>ps<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个StatementHandler就完了。</p>`,49),o=[c];function l(i,u){return s(),a("div",null,o)}const d=n(p,[["render",l],["__file","深入浅出Mybatis11：StatementHandler.html.vue"]]);export{d as default};
