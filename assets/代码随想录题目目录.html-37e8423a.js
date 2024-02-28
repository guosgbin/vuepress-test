import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as a,c as i,b as e,e as n,d as t,f as l}from"./app-6dab4fa1.js";const c={},p=e("h2",{id:"数组",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数组","aria-hidden":"true"},"#"),n(" 数组")],-1),h={href:"https://leetcode.cn/problems/binary-search/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://leetcode.cn/problems/search-insert-position/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://leetcode.cn/problems/sqrtx/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://leetcode.cn/problems/valid-perfect-square/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://leetcode.cn/problems/remove-element/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://leetcode.cn/problems/remove-duplicates-from-sorted-array/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://leetcode.cn/problems/move-zeroes/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://leetcode.cn/problems/backspace-string-compare/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://leetcode.cn/problems/squares-of-a-sorted-array/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://leetcode.cn/problems/spiral-matrix-ii/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://leetcode.cn/problems/spiral-matrix/",target:"_blank",rel:"noopener noreferrer"},w={href:"https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/",target:"_blank",rel:"noopener noreferrer"},x=e("h2",{id:"滑动窗口",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#滑动窗口","aria-hidden":"true"},"#"),n(" 滑动窗口")],-1),j={href:"https://leetcode.cn/problems/minimum-size-subarray-sum/",target:"_blank",rel:"noopener noreferrer"},q={href:"https://leetcode.cn/problems/fruit-into-baskets/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://leetcode.cn/problems/minimum-window-substring/",target:"_blank",rel:"noopener noreferrer"},z={href:"https://leetcode.cn/problems/max-consecutive-ones-iii/",target:"_blank",rel:"noopener noreferrer"},O={href:"https://leetcode.cn/problems/longest-substring-without-repeating-characters/",target:"_blank",rel:"noopener noreferrer"},V={href:"https://leetcode.cn/problems/substring-with-concatenation-of-all-words/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://leetcode.cn/problems/repeated-dna-sequences/",target:"_blank",rel:"noopener noreferrer"},E=l(`<p>最小滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最小长度。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">while</span> j <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">:</span>
    判断<span class="token punctuation">[</span>i<span class="token punctuation">,</span> j<span class="token punctuation">]</span>是否满足条件
    <span class="token keyword">while</span> 满足条件：
        不断更新结果<span class="token punctuation">(</span>注意在<span class="token keyword">while</span>内更新！<span class="token punctuation">)</span>
        i <span class="token operator">+=</span> <span class="token number">1</span> （最大程度的压缩i，使得滑窗尽可能的小）
    j <span class="token operator">+=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最大滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最大长度。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">while</span> j <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token operator">:</span>
    判断<span class="token punctuation">[</span>i<span class="token punctuation">,</span> j<span class="token punctuation">]</span>是否满足条件
    <span class="token keyword">while</span> 不满足条件：
        i <span class="token operator">+=</span> <span class="token number">1</span> （最保守的压缩i，一旦满足条件了就退出压缩i的过程，使得滑窗尽可能的大）
    不断更新结果（注意在<span class="token keyword">while</span>外更新！）
    j <span class="token operator">+=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，关键的区别在于，最大滑窗是在迭代右移右边界的过程中更新结果，而最小滑窗是在迭代右移左边界的过程中更新结果。因此虽然都是滑窗，但是两者的模板和对应的贪心思路并不一样，而真正理解后就可以在lc.76，lc.904，lc.3, lc.1004写出非常无脑的代码。</p><p>时间复杂度为：O(N), 空间复杂度为：O(N).</p><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2>`,7),K={href:"https://leetcode.cn/problems/remove-linked-list-elements/",target:"_blank",rel:"noopener noreferrer"},L={href:"https://leetcode.cn/problems/design-linked-list/",target:"_blank",rel:"noopener noreferrer"},A={href:"https://leetcode.cn/problems/reverse-linked-list/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://leetcode.cn/problems/swap-nodes-in-pairs/",target:"_blank",rel:"noopener noreferrer"},D={href:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/",target:"_blank",rel:"noopener noreferrer"},P={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/",target:"_blank",rel:"noopener noreferrer"},S={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists/",target:"_blank",rel:"noopener noreferrer"},T={href:"https://leetcode.cn/problems/linked-list-cycle/",target:"_blank",rel:"noopener noreferrer"},F={href:"https://leetcode.cn/problems/linked-list-cycle-ii/",target:"_blank",rel:"noopener noreferrer"},G={href:"https://leetcode.cn/problems/reorder-list/",target:"_blank",rel:"noopener noreferrer"},H={href:"https://leetcode.cn/problems/rotate-list/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://leetcode.cn/problems/partition-list/",target:"_blank",rel:"noopener noreferrer"},M={href:"https://leetcode.cn/problems/split-linked-list-in-parts/",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://leetcode.cn/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},R={href:"https://leetcode.cn/problems/merge-k-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},U=e("h2",{id:"哈希表",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#哈希表","aria-hidden":"true"},"#"),n(" 哈希表")],-1),W={href:"https://leetcode.cn/problems/valid-anagram/",target:"_blank",rel:"noopener noreferrer"},X=e("li",null,[e("a",{href:""},"49.字母异位词分组")],-1),Y=e("li",null,[e("a",{href:""},"438.找到字符串中所有字母异位词")],-1),Z={href:"https://leetcode.cn/problems/intersection-of-two-arrays/",target:"_blank",rel:"noopener noreferrer"},$=e("li",null,[e("a",{href:""},"350.两个数组的交集 II")],-1),ee={href:"https://leetcode.cn/problems/happy-number/",target:"_blank",rel:"noopener noreferrer"},ne={href:"https://leetcode.cn/problems/two-sum/",target:"_blank",rel:"noopener noreferrer"},re={href:"https://leetcode.cn/problems/4sum-ii/",target:"_blank",rel:"noopener noreferrer"},te={href:"https://leetcode.cn/problems/ransom-note/",target:"_blank",rel:"noopener noreferrer"},le={href:"https://leetcode.cn/problems/3sum/",target:"_blank",rel:"noopener noreferrer"},oe={href:"https://leetcode.cn/problems/4sum/",target:"_blank",rel:"noopener noreferrer"},se=e("h2",{id:"字符串",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#字符串","aria-hidden":"true"},"#"),n(" 字符串")],-1),ae={href:"https://leetcode.cn/problems/reverse-string/",target:"_blank",rel:"noopener noreferrer"},ie={href:"https://leetcode.cn/problems/reverse-string-ii/",target:"_blank",rel:"noopener noreferrer"},ce={href:"https://leetcode.cn/problems/ti-huan-kong-ge-lcof/",target:"_blank",rel:"noopener noreferrer"},pe={href:"https://leetcode.cn/problems/reverse-words-in-a-string/",target:"_blank",rel:"noopener noreferrer"},he={href:"https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/",target:"_blank",rel:"noopener noreferrer"},de={href:"https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/",target:"_blank",rel:"noopener noreferrer"},_e=e("li",null,[e("a",{href:""},"459. 重复的子字符串")],-1),ue=e("h2",{id:"双指针法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#双指针法","aria-hidden":"true"},"#"),n(" 双指针法")],-1),be={href:"https://leetcode.cn/problems/remove-element/",target:"_blank",rel:"noopener noreferrer"},fe={href:"https://leetcode.cn/problems/remove-duplicates-from-sorted-array/",target:"_blank",rel:"noopener noreferrer"},me={href:"https://leetcode.cn/problems/move-zeroes/",target:"_blank",rel:"noopener noreferrer"},ke=e("li",null,[e("a",{href:""},"844. 比较含退格的字符串")],-1),ge={href:"https://leetcode.cn/problems/squares-of-a-sorted-array/",target:"_blank",rel:"noopener noreferrer"},ve={href:"https://leetcode.cn/problems/reverse-string-ii/",target:"_blank",rel:"noopener noreferrer"},ye={href:"https://leetcode.cn/problems/reverse-words-in-a-string/",target:"_blank",rel:"noopener noreferrer"},Ie={href:"https://leetcode.cn/problems/remove-nth-node-from-end-of-list/",target:"_blank",rel:"noopener noreferrer"},we={href:"https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/",target:"_blank",rel:"noopener noreferrer"},xe={href:"https://leetcode.cn/problems/linked-list-cycle-ii/",target:"_blank",rel:"noopener noreferrer"},je={href:"https://leetcode.cn/problems/3sum/",target:"_blank",rel:"noopener noreferrer"},qe={href:"https://leetcode.cn/problems/4sum/",target:"_blank",rel:"noopener noreferrer"},Ne=e("h2",{id:"栈和队列",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#栈和队列","aria-hidden":"true"},"#"),n(" 栈和队列")],-1),ze={href:"https://leetcode.cn/problems/implement-queue-using-stacks/",target:"_blank",rel:"noopener noreferrer"},Oe={href:"https://leetcode.cn/problems/implement-stack-using-queues/",target:"_blank",rel:"noopener noreferrer"},Ve={href:"https://leetcode.cn/problems/valid-parentheses/",target:"_blank",rel:"noopener noreferrer"},Be={href:"https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/",target:"_blank",rel:"noopener noreferrer"},Ee={href:"https://leetcode.cn/problems/evaluate-reverse-polish-notation/",target:"_blank",rel:"noopener noreferrer"},Ke=e("li",null,[e("a",{href:""},"239. 滑动窗口最大值")],-1),Le=e("li",null,[e("a",{href:""},"347. 前 K 个高频元素")],-1),Ae=e("h2",{id:"二叉树",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二叉树","aria-hidden":"true"},"#"),n(" 二叉树")],-1),Ce={href:"https://leetcode.cn/problems/binary-tree-preorder-traversal/",target:"_blank",rel:"noopener noreferrer"},De={href:"https://leetcode.cn/problems/binary-tree-postorder-traversal/",target:"_blank",rel:"noopener noreferrer"},Pe={href:"https://leetcode.cn/problems/binary-tree-inorder-traversal/",target:"_blank",rel:"noopener noreferrer"},Se={href:"https://leetcode.cn/problems/binary-tree-level-order-traversal/",target:"_blank",rel:"noopener noreferrer"},Te={href:"https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/",target:"_blank",rel:"noopener noreferrer"},Fe={href:"https://leetcode.cn/problems/binary-tree-right-side-view/",target:"_blank",rel:"noopener noreferrer"},Ge={href:"https://leetcode.cn/problems/average-of-levels-in-binary-tree/",target:"_blank",rel:"noopener noreferrer"},He=l('<li><a href="">429.N叉树的层序遍历</a></li><li><a href="">515.在每个树行中找最大值</a></li><li><a href="">116.填充每个节点的下一个右侧节点指针</a></li><li><a href="">117.填充每个节点的下一个右侧节点指针II</a></li><li><a href="">104.二叉树的最大深度</a></li><li><a href="">111.二叉树的最小深度</a></li>',6),Je={href:"https://leetcode.cn/problems/invert-binary-tree/",target:"_blank",rel:"noopener noreferrer"},Me={href:"https://leetcode.cn/problems/symmetric-tree/",target:"_blank",rel:"noopener noreferrer"},Qe=e("li",null,[e("a",{href:""},"100.相同的树")],-1),Re=e("li",null,[e("a",{href:""},"572.另一个树的子树")],-1),Ue={href:"https://leetcode.cn/problems/maximum-depth-of-binary-tree/",target:"_blank",rel:"noopener noreferrer"},We=e("li",null,[e("a",{href:""},"559.n叉树的最大深度")],-1),Xe={href:"https://leetcode.cn/problems/minimum-depth-of-binary-tree/",target:"_blank",rel:"noopener noreferrer"},Ye={href:"https://leetcode.cn/problems/count-complete-tree-nodes/",target:"_blank",rel:"noopener noreferrer"},Ze={href:"https://leetcode.cn/problems/balanced-binary-tree/",target:"_blank",rel:"noopener noreferrer"},$e={href:"https://leetcode.cn/problems/binary-tree-paths/",target:"_blank",rel:"noopener noreferrer"},en={href:"https://leetcode.cn/problems/sum-of-left-leaves/",target:"_blank",rel:"noopener noreferrer"},nn={href:"https://leetcode.cn/problems/find-bottom-left-tree-value/",target:"_blank",rel:"noopener noreferrer"},rn={href:"https://leetcode.cn/problems/path-sum/",target:"_blank",rel:"noopener noreferrer"},tn=e("li",null,[e("a",{href:""},"113. 路径总和 II")],-1),ln=e("li",null,[e("a",{href:""},"106. 从中序与后序遍历序列构造二叉树"),n(" 要找时间研究下")],-1),on=e("li",null,[e("a",{href:""},"105. 从前序与中序遍历序列构造二叉树"),n(" 要找时间研究下")],-1),sn={href:"https://leetcode.cn/problems/maximum-binary-tree/",target:"_blank",rel:"noopener noreferrer"},an={href:"https://leetcode.cn/problems/merge-two-binary-trees/",target:"_blank",rel:"noopener noreferrer"},cn=l(`<blockquote><p>二叉树做到了 21 题，暂时换个口味做做</p></blockquote><h2 id="回溯算法" tabindex="-1"><a class="header-anchor" href="#回溯算法" aria-hidden="true">#</a> 回溯算法</h2><p>回溯的模板</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">backtracking</span><span class="token punctuation">(</span>参数<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>终止条件<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        存放结果<span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span>选择：本层集合中元素（树中节点孩子的数量就是集合的大小）<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        处理节点<span class="token punctuation">;</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span>路径，选择列表<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 递归</span>
        回溯，撤销处理结果
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>回溯是递归的副产品，只要有递归就会有回溯</strong>。</p><p>回溯法就是暴力搜索，并不是什么高效的算法，最多在剪枝一下。</p><p>回溯算法能解决如下问题：</p>`,7),pn=e("li",null,[e("p",null,"组合问题：N 个数里面按一定规则找出 k 个数的集合")],-1),hn=e("li",null,[e("p",null,"排列问题：N 个数按一定规则全排列，有几种排列方式")],-1),dn=e("li",null,[e("p",null,"切割问题：一个字符串按一定规则有几种切割方式")],-1),_n=e("li",null,[e("p",null,"子集问题：一个 N 个数的集合里有多少符合条件的子集")],-1),un=e("li",null,[e("p",null,"棋盘问题：N 皇后，解数独等等")],-1),bn={href:"https://leetcode.cn/problems/combinations/",target:"_blank",rel:"noopener noreferrer"},fn={href:"https://leetcode.cn/problems/combination-sum-iii/",target:"_blank",rel:"noopener noreferrer"},mn={href:"https://leetcode.cn/problems/letter-combinations-of-a-phone-number/",target:"_blank",rel:"noopener noreferrer"},kn={href:"https://leetcode.cn/problems/combination-sum/",target:"_blank",rel:"noopener noreferrer"},gn={href:"https://leetcode.cn/problems/combination-sum-ii/",target:"_blank",rel:"noopener noreferrer"},vn={href:"https://leetcode.cn/problems/palindrome-partitioning/",target:"_blank",rel:"noopener noreferrer"},yn={href:"https://leetcode.cn/problems/restore-ip-addresses/",target:"_blank",rel:"noopener noreferrer"},In={href:"https://leetcode.cn/problems/subsets/",target:"_blank",rel:"noopener noreferrer"},wn={href:"https://leetcode.cn/problems/subsets-ii/",target:"_blank",rel:"noopener noreferrer"},xn={href:"https://leetcode.cn/problems/non-decreasing-subsequences/",target:"_blank",rel:"noopener noreferrer"},jn={href:"https://leetcode.cn/problems/permutations/",target:"_blank",rel:"noopener noreferrer"},qn={href:"https://leetcode.cn/problems/permutations-ii/",target:"_blank",rel:"noopener noreferrer"},Nn=e("blockquote",null,[e("p",null,"做到了第 18 题，换个口味")],-1),zn=e("h2",{id:"贪心算法",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#贪心算法","aria-hidden":"true"},"#"),n(" 贪心算法")],-1),On={href:"https://leetcode.cn/problems/assign-cookies/",target:"_blank",rel:"noopener noreferrer"},Vn={href:"https://leetcode.cn/problems/wiggle-subsequence/",target:"_blank",rel:"noopener noreferrer"},Bn={href:"https://leetcode.cn/problems/maximum-subarray/",target:"_blank",rel:"noopener noreferrer"},En={href:"https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/",target:"_blank",rel:"noopener noreferrer"},Kn={href:"https://leetcode.cn/problems/jump-game/",target:"_blank",rel:"noopener noreferrer"},Ln={href:"https://leetcode.cn/problems/jump-game-ii/",target:"_blank",rel:"noopener noreferrer"},An={href:"https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/",target:"_blank",rel:"noopener noreferrer"},Cn={href:"https://leetcode.cn/problems/gas-station/",target:"_blank",rel:"noopener noreferrer"},Dn={href:"https://leetcode.cn/problems/candy/",target:"_blank",rel:"noopener noreferrer"},Pn={href:"https://leetcode.cn/problems/lemonade-change/",target:"_blank",rel:"noopener noreferrer"},Sn={href:"https://leetcode.cn/problems/queue-reconstruction-by-height/",target:"_blank",rel:"noopener noreferrer"},Tn={href:"https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/",target:"_blank",rel:"noopener noreferrer"},Fn={href:"https://leetcode.cn/problems/non-overlapping-intervals/",target:"_blank",rel:"noopener noreferrer"},Gn={href:"https://leetcode.cn/problems/partition-labels/",target:"_blank",rel:"noopener noreferrer"},Hn={href:"https://leetcode.cn/problems/merge-intervals/",target:"_blank",rel:"noopener noreferrer"},Jn={href:"https://leetcode.cn/problems/monotone-increasing-digits/",target:"_blank",rel:"noopener noreferrer"},Mn=e("h2",{id:"动态规划",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#动态规划","aria-hidden":"true"},"#"),n(" 动态规划")],-1),Qn={href:"https://leetcode.cn/problems/fibonacci-number/",target:"_blank",rel:"noopener noreferrer"},Rn={href:"https://leetcode.cn/problems/climbing-stairs/",target:"_blank",rel:"noopener noreferrer"},Un={href:"https://leetcode.cn/problems/min-cost-climbing-stairs/",target:"_blank",rel:"noopener noreferrer"},Wn={href:"https://leetcode.cn/problems/unique-paths/",target:"_blank",rel:"noopener noreferrer"},Xn={href:"https://leetcode.cn/problems/unique-paths-ii/",target:"_blank",rel:"noopener noreferrer"},Yn={href:"https://leetcode.cn/problems/integer-break/",target:"_blank",rel:"noopener noreferrer"},Zn={href:"https://leetcode.cn/problems/unique-binary-search-trees/",target:"_blank",rel:"noopener noreferrer"};function $n(er,nr){const r=s("ExternalLinkIcon");return a(),i("div",null,[p,e("ul",null,[e("li",null,[e("a",h,[n("704. 二分查找"),t(r)])]),e("li",null,[e("a",d,[n("35. 搜索插入位置"),t(r)])]),e("li",null,[e("a",_,[n("34. 在排序数组中查找元素的第一个和最后一个位置"),t(r)])]),e("li",null,[e("a",u,[n("69.x 的平方根"),t(r)])]),e("li",null,[e("a",b,[n("367.有效的完全平方数"),t(r)])]),e("li",null,[e("a",f,[n("27. 移除元素"),t(r)])]),e("li",null,[e("a",m,[n("26.删除排序数组中的重复项"),t(r)])]),e("li",null,[e("a",k,[n("283.移动零"),t(r)])]),e("li",null,[e("a",g,[n("844.比较含退格的字符串"),t(r)]),n(" 有个双指针的解法比较复杂")]),e("li",null,[e("a",v,[n("977.有序数组的平方"),t(r)])]),e("li",null,[e("a",y,[n("59.螺旋矩阵II"),t(r)])]),e("li",null,[e("a",I,[n("54. 螺旋矩阵"),t(r)])]),e("li",null,[e("a",w,[n("34. 在排序数组中查找元素的第一个和最后一个位置"),t(r)]),n(" 没看懂，再做一遍")])]),x,e("ul",null,[e("li",null,[e("a",j,[n("209.长度最小的子数组"),t(r)]),n(" 滑动窗口")]),e("li",null,[e("a",q,[n("904. 水果成篮"),t(r)]),n(" 滑动窗口")]),e("li",null,[e("a",N,[n("76. 最小覆盖子串"),t(r)]),n("滑动窗口")]),e("li",null,[e("a",z,[n("1004. 最大连续1的个数 III"),t(r)]),n(" 重新做一下")]),e("li",null,[e("a",O,[n("3. 无重复字符的最长子串"),t(r)])]),e("li",null,[e("a",V,[n("30. 串联所有单词的子串"),t(r)]),n("难度较高")]),e("li",null,[e("a",B,[n("187. 重复的DNA序列"),t(r)]),n(" 使用滑动窗口做一下，目前用的呆比做法")])]),E,e("ul",null,[e("li",null,[e("a",K,[n("203.移除链表元素"),t(r)])]),e("li",null,[e("a",L,[n("707.设计链表"),t(r)])]),e("li",null,[e("a",A,[n("206.反转链表"),t(r)])]),e("li",null,[e("a",C,[n("24. 两两交换链表中的节点"),t(r)])]),e("li",null,[e("a",D,[n("19.删除链表的倒数第N个节点"),t(r)])]),e("li",null,[e("a",P,[n("面试题 02.07. 链表相交"),t(r)])]),e("li",null,[e("a",S,[n("160.链表相交"),t(r)])]),e("li",null,[e("a",T,[n("141. 环形链表"),t(r)])]),e("li",null,[e("a",F,[n("142.环形链表II"),t(r)])]),e("li",null,[e("a",G,[n("143. 重排链表"),t(r)]),n(" 可以再复习下")]),e("li",null,[e("a",H,[n("61. 旋转链表"),t(r)]),n(" 可以再复习下")]),e("li",null,[e("a",J,[n("86. 分隔链表"),t(r)])]),e("li",null,[e("a",M,[n("725. 分隔链表"),t(r)])]),e("li",null,[e("a",Q,[n("21. 合并两个有序链表"),t(r)])]),e("li",null,[e("a",R,[n("23. 合并 K 个升序链表"),t(r)])])]),U,e("ul",null,[e("li",null,[e("a",W,[n("242.有效的字母异位词"),t(r)])]),X,Y,e("li",null,[e("a",Z,[n("349. 两个数组的交集"),t(r)])]),$,e("li",null,[e("a",ee,[n("202. 快乐数"),t(r)])]),e("li",null,[e("a",ne,[n("1. 两数之和"),t(r)])]),e("li",null,[e("a",re,[n("454. 四数相加 II"),t(r)])]),e("li",null,[e("a",te,[n("383. 赎金信"),t(r)])]),e("li",null,[e("a",le,[n("15. 三数之和"),t(r)])]),e("li",null,[e("a",oe,[n("18. 四数之和"),t(r)])])]),se,e("ul",null,[e("li",null,[e("a",ae,[n("344. 反转字符串"),t(r)])]),e("li",null,[e("a",ie,[n("541. 反转字符串 II"),t(r)])]),e("li",null,[e("a",ce,[n("剑指 Offer 05. 替换空格"),t(r)])]),e("li",null,[e("a",pe,[n("151. 反转字符串中的单词"),t(r)])]),e("li",null,[e("a",he,[n("剑指 Offer 58 - II. 左旋转字符串"),t(r)])]),e("li",null,[e("a",de,[n("28. 找出字符串中第一个匹配项的下标"),t(r)])]),_e]),ue,e("ul",null,[e("li",null,[e("a",be,[n("27. 移除元素"),t(r)])]),e("li",null,[e("a",fe,[n("26.删除排序数组中的重复项"),t(r)])]),e("li",null,[e("a",me,[n("283. 移动零"),t(r)])]),ke,e("li",null,[e("a",ge,[n("977. 有序数组的平方"),t(r)])]),e("li",null,[e("a",ve,[n("541. 反转字符串 II"),t(r)])]),e("li",null,[e("a",ye,[n("151. 反转字符串中的单词"),t(r)])]),e("li",null,[e("a",Ie,[n("19. 删除链表的倒数第 N 个结点"),t(r)])]),e("li",null,[e("a",we,[n("面试题 02.07. 链表相交"),t(r)])]),e("li",null,[e("a",xe,[n("142. 环形链表 II"),t(r)])]),e("li",null,[e("a",je,[n("15. 三数之和"),t(r)])]),e("li",null,[e("a",qe,[n("18. 四数之和"),t(r)])])]),Ne,e("ul",null,[e("li",null,[e("a",ze,[n("232. 用栈实现队列"),t(r)])]),e("li",null,[e("a",Oe,[n("225. 用队列实现栈"),t(r)])]),e("li",null,[e("a",Ve,[n("20. 有效的括号"),t(r)])]),e("li",null,[e("a",Be,[n("1047. 删除字符串中的所有相邻重复项"),t(r)])]),e("li",null,[e("a",Ee,[n("150. 逆波兰表达式求值"),t(r)])]),Ke,Le]),Ae,e("ul",null,[e("li",null,[e("a",Ce,[n("144. 二叉树的前序遍历"),t(r)])]),e("li",null,[e("a",De,[n("145. 二叉树的后序遍历"),t(r)])]),e("li",null,[e("a",Pe,[n("94. 二叉树的中序遍历"),t(r)])]),e("li",null,[e("a",Se,[n("102. 二叉树的层序遍历"),t(r)])]),e("li",null,[e("a",Te,[n("107. 二叉树的层序遍历 II"),t(r)])]),e("li",null,[e("a",Fe,[n("199. 二叉树的右视图"),t(r)])]),e("li",null,[e("a",Ge,[n("637. 二叉树的层平均值"),t(r)])]),He,e("li",null,[e("a",Je,[n("226. 翻转二叉树"),t(r)])]),e("li",null,[e("a",Me,[n("101. 对称二叉树"),t(r)])]),Qe,Re,e("li",null,[e("a",Ue,[n("104. 二叉树的最大深度"),t(r)])]),We,e("li",null,[e("a",Xe,[n("111. 二叉树的最小深度"),t(r)])]),e("li",null,[e("a",Ye,[n("222. 完全二叉树的节点个数"),t(r)])]),e("li",null,[e("a",Ze,[n("110. 平衡二叉树"),t(r)])]),e("li",null,[e("a",$e,[n("257. 二叉树的所有路径"),t(r)])]),e("li",null,[e("a",en,[n("404. 左叶子之和"),t(r)])]),e("li",null,[e("a",nn,[n("513. 找树左下角的值"),t(r)])]),e("li",null,[e("a",rn,[n("112. 路径总和"),t(r)])]),tn,ln,on,e("li",null,[e("a",sn,[n("654. 最大二叉树"),t(r)]),n(" 我是直接抄的答案，找个时间重写下")]),e("li",null,[e("a",an,[n("617. 合并二叉树"),t(r)])])]),cn,e("ul",null,[pn,hn,dn,_n,un,e("li",null,[e("p",null,[e("a",bn,[n("77. 组合"),t(r)])])]),e("li",null,[e("p",null,[e("a",fn,[n("216. 组合总和 III"),t(r)])])]),e("li",null,[e("p",null,[e("a",mn,[n("17. 电话号码的字母组合"),t(r)])])]),e("li",null,[e("p",null,[e("a",kn,[n("39. 组合总和"),t(r)])])]),e("li",null,[e("p",null,[e("a",gn,[n("40. 组合总和 II"),t(r)])])]),e("li",null,[e("p",null,[e("a",vn,[n("131. 分割回文串"),t(r)])])]),e("li",null,[e("p",null,[e("a",yn,[n("93. 复原 IP 地址"),t(r)])])]),e("li",null,[e("p",null,[e("a",In,[n("78. 子集"),t(r)])])]),e("li",null,[e("p",null,[e("a",wn,[n("90. 子集 II"),t(r)])])]),e("li",null,[e("p",null,[e("a",xn,[n("491. 递增子序列"),t(r)])])]),e("li",null,[e("p",null,[e("a",jn,[n("46. 全排列"),t(r)])])]),e("li",null,[e("p",null,[e("a",qn,[n("47. 全排列 II"),t(r)])])])]),Nn,zn,e("ul",null,[e("li",null,[e("a",On,[n("455. 分发饼干"),t(r)])]),e("li",null,[e("a",Vn,[n("376. 摆动序列"),t(r)])]),e("li",null,[e("a",Bn,[n("53. 最大子数组和"),t(r)])]),e("li",null,[e("a",En,[n("122. 买卖股票的最佳时机 II"),t(r)])]),e("li",null,[e("a",Kn,[n("55. 跳跃游戏"),t(r)])]),e("li",null,[e("a",Ln,[n("45. 跳跃游戏 II"),t(r)])]),e("li",null,[e("a",An,[n("1005.K 次取反后最大化的数组和"),t(r)]),n("有重做的可以")]),e("li",null,[e("a",Cn,[n("134. 加油站"),t(r)])]),e("li",null,[e("a",Dn,[n("135. 分发糖果"),t(r)])]),e("li",null,[e("a",Pn,[n("860. 柠檬水找零"),t(r)])]),e("li",null,[e("a",Sn,[n("406. 根据身高重建队列"),t(r)])]),e("li",null,[e("a",Tn,[n("452. 用最少数量的箭引爆气球"),t(r)])]),e("li",null,[e("a",Fn,[n("435. 无重叠区间"),t(r)]),n("有问题")]),e("li",null,[e("a",Gn,[n("763. 划分字母区间"),t(r)])]),e("li",null,[e("a",Hn,[n("56. 合并区间"),t(r)])]),e("li",null,[e("a",Jn,[n("738. 单调递增的数字"),t(r)])])]),Mn,e("ul",null,[e("li",null,[e("a",Qn,[n("509. 斐波那契数"),t(r)])]),e("li",null,[e("a",Rn,[n("70. 爬楼梯"),t(r)])]),e("li",null,[e("a",Un,[n("746. 使用最小花费爬楼梯"),t(r)])]),e("li",null,[e("a",Wn,[n("62. 不同路径"),t(r)])]),e("li",null,[e("a",Xn,[n("63. 不同路径 II"),t(r)])]),e("li",null,[e("a",Yn,[n("343. 整数拆分"),t(r)])]),e("li",null,[e("a",Zn,[n("96. 不同的二叉搜索树"),t(r)]),n(" 没做这个")])])])}const lr=o(c,[["render",$n],["__file","代码随想录题目目录.html.vue"]]);export{lr as default};
