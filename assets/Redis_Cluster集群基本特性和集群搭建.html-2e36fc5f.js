import{_ as e,X as s,Y as n,$ as a}from"./framework-3fb3c5c0.js";const i="/assets/image-20230503232223534-3127345-abe13ac4.png",d="/assets/image-20230503231213989-08f419de.png",l={},c=a('<table><thead><tr><th>版本</th><th>内容</th><th>时间</th></tr></thead><tbody><tr><td>V1</td><td>新建</td><td>2023年05月04日09:12:05</td></tr></tbody></table><blockquote><p>本文内容来自 Redis 使用手册</p></blockquote><h2 id="集群概念" tabindex="-1"><a class="header-anchor" href="#集群概念" aria-hidden="true">#</a> 集群概念</h2><p>Redis 集群是 Redis 3.0 版本开始正式引入的功能，给用户带来了在线扩展 Redis 系统读写能力，Redis 5.0 更是在集群原有功能的基础上，进一步添加了更多新功能，并且对原有功能做了非常多的优化，使得整个集群系统更简单、易用和高效。</p><h2 id="基本特性" tabindex="-1"><a class="header-anchor" href="#基本特性" aria-hidden="true">#</a> 基本特性</h2><h3 id="复制和高可用" tabindex="-1"><a class="header-anchor" href="#复制和高可用" aria-hidden="true">#</a> 复制和高可用</h3><p>Redis 集群和单机版的 Redis 服务器一样，也提供了主从复制的功能。在 Redis 集群中，各个 Redis 服务器被称为节点（node），其中主节点（master node）负责处理客户端发送的读写命令请求，而从节点（replica/save node）则负责对主节点进行复制。</p><p>除了复制功能外，Redis 集群还提供了类似单机版 Redis Sentinel 的功能，以此来为集群提供高可用特性。简单来说，集群中各个节点将互相监视各自的运行状况，并在某个主节点下线时，通过提升该节点的从节点作为新主节点来继续提供服务。</p><h3 id="分片和重分片" tabindex="-1"><a class="header-anchor" href="#分片和重分片" aria-hidden="true">#</a> 分片和重分片</h3><p>常见的数据分区规则有哈希分区和顺序分区两种。</p><ul><li>哈希分区： <ul><li>离散度好；</li><li>数据分布业务无关；</li><li>无法顺序访问；</li></ul></li><li>顺序分区： <ul><li>离散度易倾斜；</li><li>数据分布业务相关；</li><li>可顺序访问；</li></ul></li></ul><p>Redis 使用的是哈希分区，哈希分区又分为很多种：</p><ul><li>节点取余分区；</li><li>一致性哈希分区；</li><li>虚拟槽分区；</li></ul><h4 id="节点取余分区" tabindex="-1"><a class="header-anchor" href="#节点取余分区" aria-hidden="true">#</a> 节点取余分区</h4><p><strong>节点取余分区</strong>：这种方式的突出优点是简单性， 常用于数据库的分库分表规则；</p><h4 id="一致性哈希分区" tabindex="-1"><a class="header-anchor" href="#一致性哈希分区" aria-hidden="true">#</a> 一致性哈希分区</h4><p><strong>一致性哈希分区</strong>：实现思路就是为系统中的每个节点分配一个 token，范围一般在 0 - 2 的 32 次方，这些 token 构成一个哈希环，执行节点查找操作时， 先根据 key 计算 hash 值， 然后顺时针找到第一个大于等于该哈希值的 token 节点。</p><p>一致性哈希分区如下：</p><img src="'+i+'" alt="image-20230503232223534" style="zoom:67%;"><p>这种方式相比节点取余最大的好处在于加入和删除节点只影响哈希环中相邻的节点，对其他节点无影响。但一致性哈希分区存在几个问题：</p><ul><li>加减节点会造成哈希环中部分数据无法命中，需要手动处理或者忽略这部分数据，因此一致性哈希常用于缓存场景。</li><li>当使用少量节点时，节点变化将大范围影响哈希环中数据映射，因此这种方式不适合少量数据节点的分布式方案。</li><li>普通的一致性哈希分区在增减节点时需要增加一倍或减去一半节点才能保证数据和负载的均衡。</li></ul><p>正因为一致性哈希分区的这些缺点，一些分布式系统采用虚拟槽对一致性哈希进行改进。</p><h4 id="虚拟槽分区" tabindex="-1"><a class="header-anchor" href="#虚拟槽分区" aria-hidden="true">#</a> 虚拟槽分区</h4><p>虚拟槽分区巧妙地使用了哈希空间，使用分散度良好的哈希函数把所有数据映射到一个固定范围的整数集合中，整数定义为槽（slot）。这个范围一般远远大于节点数，比如 Redis Cluster 槽范围是 0~16383。槽是集群内数据管理和迁移的基本单位。采用大范围槽的主要目的是为了方便数据拆分和集群扩展。每个节点会负责一定数量的槽。</p><p>当前集群有 5 个节点，每个节点平均大约负责 3276 个槽。由于采用高质量的哈希算法，每个槽所映射的数据通常比较均匀，将数据平均划分到 5 个节点进行数据分区。</p><h4 id="redis-使用的分区-虚拟槽" tabindex="-1"><a class="header-anchor" href="#redis-使用的分区-虚拟槽" aria-hidden="true">#</a> Redis 使用的分区（虚拟槽）</h4><p>Redis 集群通过将数据库分散存储到多个节点上来平衡各个节点的负载压力。</p><p>具体来说：Redis 集群会将整个数据库空间划分为 16384 个槽（slot）来实现数据分片（sharding），而集群中的各个主节点则会分别负责处理其中一部分槽。当用户尝试讲一个键存储到集群中时，客户端会先计算出键所属的槽，接着记录集群节点槽分布的映射表中找出处理该槽的节点，最后再将键存储到相应的节点中。</p><img src="'+d+`" alt="image-20230503231213989" style="zoom:67%;"><p>当用户想要向集群添加新节点时，只需要向 Redis 集群发送几条简单的命令，集群就会将相应的槽以及槽中存储的数据迁移至新节点。与此类似，当用户想要从集群中移除已存在的节点时，被移除的节点也会将自己负责处理的槽以及槽中数据转交给集群中的其他节点负责。最重要的是，无论是向集群添加新节点还是从集群中移除已有节点，整个重分片（reshard）过程都可以在线进行，Redis 集群无须因此而停机。</p><h3 id="高性能" tabindex="-1"><a class="header-anchor" href="#高性能" aria-hidden="true">#</a> 高性能</h3><p>Redis 集群采用无代理模式，客户端发送的所有命令都会直接交由节点执行，并且对于经过优化的集群客户端来说，客户端发送的命令在绝大部分情况下都不需要实施转向，或者仅需要一次转向，因此在 Redis 集群中执行命令的性能与在单机 Redis 服务器上执行命令的性能非常接近。</p><p>除了节点之间互通信息带来的性能损耗之外，单个 Redis 集群节点处理命令请求的性能与单个 Redis 服务器处理命令请求的性能几乎别无二致。从理论上来讲，集群每增加一倍数量的主节点，集群对于命令请求的处理性能就会提高一倍。</p><h2 id="搭建集群" tabindex="-1"><a class="header-anchor" href="#搭建集群" aria-hidden="true">#</a> 搭建集群</h2><p>搭建一个 3 个主节点和 3 个从节点的集群。</p><p>配置文件，端口是 30001 到 30006，建立 6 个配置文件，cluster-config-file 是用于集群内部的配置文件，因为本次是部署到一个机器上，建议使用不同的名字。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>port 30001
# 开启集群模式
cluster-enabled yes
# 节点超时时间，毫秒
cluster-node-timeout 15000
# 集群内部配置文件
cluster-config-file &quot;nodes-30001.conf&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接使用 redis-server 指定配置文件启动，这样就启动 6 台 Redis 实例成功了。</p><p>首次生成的 node.conf 文件如下，例如 node-30001.conf</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>7a6062647ca518602bfd4df53aa05e8b91685492 :0@0 myself,master - 0 0 0 connected
vars currentEpoch 0 lastVoteEpoch 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>文件内容记录了集群初始状态， 这里最重要的是节点 ID， 它是一个 40 位 16 进制字符串， 用于唯一标识集群内一个节点， 之后很多集群操作都要借助于节点 ID 来完成。 需要注意是， 节点 ID 不同于运行 ID。 节点 ID 在集群初始化时只创建一次， 节点重启时会加载集群配置文件进行重用， 而 Redis 的运行 ID 每次重启都会变化。</p><p>在节点 30001 执行 cluster nodes 命令获取集群节点状态：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>127.0.0.1:30001&gt; cluster nodes
7a6062647ca518602bfd4df53aa05e8b91685492 :30001@40001 myself,master - 0 0 0 connected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然我们已经启动了 6 个集群节点，但是由于这些节点并未相互联通，接下来需要将这 6 个节点连接起来并给它们分配槽。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster create 127.0.0.1:30001 127.0.0.1:30002 127.0.0.1:30003 127.0.0.1:30004 127.0.0.1:30005 127.0.0.1:30006 --cluster-replicas 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>redis-cli --cluster 是自带的集群管理工具，create 子命令接收任意多个节点的 IP 地址和端口作为参数，用这些节点组成一个集群，可选参数 cluster-replicas 用于指定集群中每个主节点的从节点数量。</p><p>使用上面的命令后将指定出下面的节点角色和槽的分配计划</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; Performing hash slots allocation on 6 nodes...
Master[0] -&gt; Slots 0 - 5460
Master[1] -&gt; Slots 5461 - 10922
Master[2] -&gt; Slots 10923 - 16383
Adding replica 127.0.0.1:30005 to 127.0.0.1:30001
Adding replica 127.0.0.1:30006 to 127.0.0.1:30002
Adding replica 127.0.0.1:30004 to 127.0.0.1:30003
&gt;&gt;&gt; Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[0-5460] (5461 slots) master
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[5461-10922] (5462 slots) master
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[10923-16383] (5461 slots) master
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
Can I set the above configuration? (type &#39;yes&#39; to accept): 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，尝试把 30001、30002、30003 作为主节点，30004、30005、30006 分别为它们的从节点。将 16383 槽平均分为 3 份。输入 yes 后</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; Nodes configuration updated
&gt;&gt;&gt; Assign a different config epoch to each node
&gt;&gt;&gt; Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
.
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OK 集群搭建已经完成</p><p>集群完整性检查，使用 <code>redis-cli --cluster check IP:端口</code>命令，check 命令只需要给出集群中任意一个节点地址就可以完成整个集群的检查工作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ ./redis-cli --cluster check 127.0.0.1:30001
127.0.0.1:30001 (7a606264...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30003 (7ffb7490...) -&gt; 0 keys | 5461 slots | 1 slaves.
127.0.0.1:30002 (b894fa8e...) -&gt; 0 keys | 5462 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
&gt;&gt;&gt; Performing Cluster Check (using node 127.0.0.1:30001)
M: 7a6062647ca518602bfd4df53aa05e8b91685492 127.0.0.1:30001
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 7ffb74903c1f83e972db6aa4ccbea7d05c78522e 127.0.0.1:30003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 348c9f527752ea19f29ccf662e939d6c6dc10678 127.0.0.1:30004
   slots: (0 slots) slave
   replicates 7ffb74903c1f83e972db6aa4ccbea7d05c78522e
S: 49eb6dbcb6bd920702a8d8c4d4d76b1b621b7b9a 127.0.0.1:30006
   slots: (0 slots) slave
   replicates b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf
M: b894fa8eae24d0ffec68bf0e7ada98fd2f5b37cf 127.0.0.1:30002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: e9afac3ecc6ca627830cf24d5fd0834d6b747b31 127.0.0.1:30005
   slots: (0 slots) slave
   replicates 7a6062647ca518602bfd4df53aa05e8b91685492
[OK] All nodes agree about slots configuration.
&gt;&gt;&gt; Check for open slots...
&gt;&gt;&gt; Check slots coverage...
[OK] All 16384 slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hash-tag" tabindex="-1"><a class="header-anchor" href="#hash-tag" aria-hidden="true">#</a> hash tag</h2><p>在默认情况下，Redis 根据用户输入的整个键计算出该键所属的槽，然后将键存储到相应的槽中。但是在某些情况下，出于性能方面的考虑，或者为了在同一个节点上对多个相关联的键执行批量操作，我们也会想要将一些原本不属于同一个槽的键放到相同的槽里面。</p><p>如果某个 key 的某个部分用<code>{</code> 和<code>}</code> 包裹，则只会计算第一个大括号包括的散列值来分配槽。这样一来，即使两个键原本不属于同一个槽，但只要它们拥有相同的被包围子串，那么程序计算出的散列值就是一样的，因此 Redis 集群就会把它们存储到同一个槽中</p><ul><li>如果键包含 <code>{</code> 字符；</li><li>如果 <code>{</code> 右边有一个 <code>}</code> 字符；</li><li>如果在第一次出现的 <code>{</code> 和第一次出现的 <code>}</code> 之间有一个或多个字符；</li></ul><p>仅对第一次出现的 <code>{</code> 和随后第一次出现的 <code>}</code> 之间的内容进行哈希处理。</p><p>举个例子：</p><ul><li><code>{user1000}.following</code> 和 <code>{user1000}.followers</code> 这两个键将哈希到同一个哈希槽，因为只有子字符串 <code>user1000</code> 会被哈希以计算哈希槽；</li><li>对于键 <code>foo{}{bar}</code> ，整个键将像往常一样被散列，因为第一次出现的 <code>{</code> 后面跟着右边的 <code>}</code>，中间没有字符；</li><li>对于键 <code>foo{{bar}}zap</code>，子字符串 <code>{bar</code> 将被散列，因为它是第一次出现的 <code>{</code> 和第一次出现的 <code>}</code> 之间的子串；</li><li>对于键 <code>foo{bar}{zap}</code>，子字符串 <code>bar</code> 将被散列，因为算法在 <code>{</code> 和 <code>}</code> 的第一个有效或无效（内部没有字节）匹配时停止；</li><li>从该算法可以看出，如果密钥以<code>{}</code>开头，则保证将其作为一个整体进行哈希处理。这在使用二进制数据作为键名时很有用；</li></ul><p>给定哈希标签后，以下是用 C语言实现 HASH_SLOT 函数的代码。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token function">HASH_SLOT</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>key<span class="token punctuation">,</span> <span class="token keyword">int</span> keylen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> s<span class="token punctuation">,</span> e<span class="token punctuation">;</span> <span class="token comment">/* start-end indexes of { and } */</span>

    <span class="token comment">/* Search the first occurrence of &#39;{&#39;. */</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>s <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> s <span class="token operator">&lt;</span> keylen<span class="token punctuation">;</span> s<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;{&#39;</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token comment">/* No &#39;{&#39; ? Hash the whole key. This is the base case. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> keylen<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">crc16</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>keylen<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">16383</span><span class="token punctuation">;</span>

    <span class="token comment">/* &#39;{&#39; found? Check if we have the corresponding &#39;}&#39;. */</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>e <span class="token operator">=</span> s<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span> e <span class="token operator">&lt;</span> keylen<span class="token punctuation">;</span> e<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">[</span>e<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;}&#39;</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>

    <span class="token comment">/* No &#39;}&#39; or nothing between {} ? Hash the whole key. */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">==</span> keylen <span class="token operator">||</span> e <span class="token operator">==</span> s<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">crc16</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>keylen<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">16383</span><span class="token punctuation">;</span>

    <span class="token comment">/* If we are here there is both a { and a } on its right. Hash
     * what is in the middle between { and }. */</span>
    <span class="token keyword">return</span> <span class="token function">crc16</span><span class="token punctuation">(</span>key<span class="token operator">+</span>s<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span>e<span class="token operator">-</span>s<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">16383</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,62),t=[c];function o(r,p){return s(),n("div",null,t)}const v=e(l,[["render",o],["__file","Redis_Cluster集群基本特性和集群搭建.html.vue"]]);export{v as default};
