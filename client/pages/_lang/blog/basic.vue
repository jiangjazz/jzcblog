/*
 * @Author: Janzen 
 * @Date: 2018-06-14 23:17:50 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-06-15 00:05:22
 */
<template>
  <div class="blog-basic">
    <h1>
      具体细节
    </h1>
    <h2 id="Object-C是什么">头文件的引用方式</h2>
    <p>#import 选项和 #include 选项完全相同，只是它可以确保相同的文件只会被包含一次。Objective-C 的例子和文档都倾向于使用 #import，你的代码也应该是这样的。</p>
    <figure class="highlight html">
      <table>
        <tbody>
          <tr>
            <td class="code">
              <pre><span class="line"><span class="tag"><span class="name">#import</span> <span class="string">&lt;Foundation/Foundation.h&gt;</span></span></span><br></pre>
            </td>
          </tr>
        </tbody>
      </table>
    </figure>
  </div>
</template>
<script>
export default {
  name: 'blog_basic'
}
</script>

