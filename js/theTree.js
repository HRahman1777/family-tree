function expand(d) {
  var children = d.children || d._children;
  if (d._children) {
    d.children = d._children;
    d._children = null;
  }
  if (children) children.forEach(expand);
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function setTreeMode(mode) {
  var expandButton = document.getElementById('expand-all');
  var collapseButton = document.getElementById('collapse-all');
  var expanded = mode === 'expanded';
  expandButton.classList.toggle('active', expanded);
  collapseButton.classList.toggle('active', !expanded);
  expandButton.setAttribute('aria-pressed', expanded);
  collapseButton.setAttribute('aria-pressed', !expanded);
}

function expandAll() {
  expand(root);
  setTreeMode('expanded');
  update(root);
}

function collapseAll() {
  if (root.children) root.children.forEach(collapse);
  setTreeMode('collapsed');
  update(root);
}

var language = 'bn';
var margin = { top: 45, right: 80, bottom: 45, left: 110 };
var width = 1100;
var height = 650;
var horizontalScale = 2.2;
var i = 0;
var duration = 650;
var yearsPerGeneration = 25;
var root;
var tree = d3.layout.tree().size([width, height]);
var diagonal = d3.svg.diagonal().projection(function (d) {
  return [d.x, d.y];
});
var treeHost = d3.select('#tree');
var svg = treeHost.append('svg');
var canvas = svg.append('g').attr('class', 'tree-canvas');

var latinMap = {
  জিয়া: 'Zia',
  উদ্দিন: 'Uddin',
  মোছলেম: 'Moslem',
  ছৈয়দ: 'Syed',
  আলী: 'Ali',
  হোসেন: 'Hossain',
  মাজেদ: 'Majed',
  তাজিব: 'Tajib',
  সাবিউল্যা: 'Sabiullah',
  সুজাউল্যা: 'Sujaullah',
  তকিউল্যা: 'Taqiullah',
  সামসুদ্দিন: 'Shamsuddin',
  জামাল: 'Jamal',
  শরিফ: 'Sharif',
  মোহাম্মদ: 'Mohammad',
  তছলিম: 'Taslim',
  আজগর: 'Azgar',
  মহব্বত: 'Mahabbat',
  জিন্ন: 'Jinna',
  খন্দকার: 'Khandakar',
  জাকির: 'Zakir',
  সুলতান: 'Sultan',
  সাদাত: 'Sadat',
  সাবির: 'Sabir',
  তাজুরদ্দিন: 'Tajurddin',
  দীন: 'Din',
  দেওয়ান: 'Dewan',
  শাহাবুদ্দিন: 'Shahabuddin',
  মকবুল: 'Mokbul',
  বুরহান: 'Burhan',
  নিজামদ্দিন: 'Nizamuddin',
  আব্দুর: 'Abdur',
  গফুর: 'Gafur',
  সবুর: 'Sabur',
  রশিদ: 'Rashid',
  ছমির: 'Chomir',
  হাজি: 'Haji',
  আলামদ্দিন: 'Alamuddin',
  জমির: 'Zamir',
  তকিব্যপারী: 'Takib Byapari',
  খবির: 'Khabir',
  করিম: 'Karim',
  রহমান: 'Rahman',
  হাকিম: 'Hakim',
  মফিজ: 'Mofiz',
  নূরুল: 'Nurul',
  ইসলাম: 'Islam',
  মাহবুবুর: 'Mahbubur',
  হাসিবুর: 'Hasibur',
  সাজিদ: 'Sajid',
  মাহমুদ: 'Mahmud',
  রাজ্জাক: 'Razzak',
  আহকাম: 'Ahkam',
  রমিজদ্দিন: 'Ramizuddin',
  ইমাম: 'Imam',
  বদরউদ্দিন: 'Badruddin',
  বাহাউদ্দিন: 'Bahauddin',
  তৈয়বুর: 'Taiyabur',
  আউয়াল: 'Awwal',
  আকবর: 'Akbar',
  নাজিমদ্দিন: 'Nazimuddin',
  কাজিমদ্দিন: 'Kazimuddin',
  জিন্নত: 'Jinnat',
  আব্বাছ: 'Abbas',
  শুকুর: 'Shukur',
  ব্যপারী: 'Byapari',
  বকস: 'Baks',
  মন্ডল: 'Mandal',
  তামিজ: 'Tamiz',
  ফসিউল্যা: 'Fasiullah',
  তাজিদুল্যা: 'Tajidullah',
  আলি: 'Ali',
  খাদেম: 'Khadem',
  জান: 'Jan',
  লাল: 'Lal',
  মোছলেহ: 'Mosleh',
  জালাল: 'Jalal',
  রহিম: 'Rahim',
  এলাহি: 'Elahi',
  কালাই: 'Kalai',
  মাজম: 'Majam',
  তাজু: 'Taju',
  মজু: 'Maju',
  মিঞা: 'Mia',
  ওরফে: 'alias',
  মোঃ: 'Md.',
  সৈয়দ: 'Sayyid',
  দেওয়ান: 'Dewan',
  আউয়াল: 'Awwal',
  আমিনুল: 'Aminul',
  মনিরুল: 'Monirul',
};

var arabicMap = {
  মোঃ: 'محمد',
  জিয়া: 'ضياء',
  উদ্দিন: 'الدين',
  মোছলেম: 'مسلم',
  ছৈয়দ: 'سيد',
  আলী: 'علي',
  হোসেন: 'حسين',
  মাজেদ: 'ماجد',
  তাজিব: 'تاجب',
  তকিউল্যা: 'تقي الله',
  সুজাউল্যা: 'سجاء الله',
  সাবিউল্যা: 'سبيع الله',
  সামসুদ্দিন: 'شمس الدين',
  জামাল: 'جمال',
  শরিফ: 'شريف',
  মোহাম্মদ: 'محمد',
  তছলিম: 'تسليم',
  আজগর: 'أزغر',
  মহব্বত: 'محبت',
  জিন্ন: 'جن',
  খন্দকার: 'خاندكار',
  জাকির: 'ذاكر',
  সুলতান: 'سلطان',
  সাদাত: 'سعادات',
  সাবির: 'صابر',
  দীন: 'الدين',
  শাহাবুদ্দিন: 'شهاب الدين',
  মকবুল: 'مقبول',
  বুরহান: 'برهان',
  নিজামদ্দিন: 'نظام الدين',
  আব্দুর: 'عبد',
  গফুর: 'غفور',
  সবুর: 'صبور',
  রশিদ: 'رشيد',
  ছমির: 'شمير',
  হাজি: 'حاجي',
  আলামদ্দিন: 'علام الدين',
  জমির: 'زمير',
  তকিব্যপারী: 'تقي بياري',
  খবির: 'خبير',
  করিম: 'كريم',
  রহমান: 'الرحمن',
  হাকিম: 'حكيم',
  মফিজ: 'مفيز',
  নূরুল: 'نور',
  হাসিবুর: 'حسيب',
  মাহবুবুর: 'محبوب',
  সাজিদ: 'ساجد',
  মাহমুদ: 'محمود',
  রাজ্জাক: 'الرزاق',
  ইসলাম: 'الإسلام',
  আহকাম: 'أحكام',
  রমিজদ্দিন: 'رميز الدين',
  ইমাম: 'إمام',
  বদরউদ্দিন: 'بدر الدين',
  বাহাউদ্দিন: 'بهاء الدين',
  তৈয়বুর: 'طيب الرحمن',
  আউয়াল: 'الأول',
  আকবর: 'أكبر',
  নাজিমদ্দিন: 'ناظم الدين',
  কাজিমদ্দিন: 'كاظم الدين',
  জিন্নত: 'جنة',
  আব্বাছ: 'عباس',
  শুকুর: 'شكور',
  ব্যপারী: 'بياري',
  বকস: 'بكس',
  মন্ডল: 'مندل',
  তামিজ: 'تمييز',
  ফসিউল্যা: 'فسي الله',
  তাজিদুল্যা: 'تاج الله',
  আলি: 'علي',
  খাদেম: 'خادم',
  জান: 'جان',
  লাল: 'لال',
  মোছলেহ: 'مصلح',
  জালাল: 'جلال',
  রহিম: 'رحيم',
  এলাহি: 'إلهي',
  কালাই: 'كلائي',
  মাজম: 'ماجم',
  তাজু: 'تاجو',
  তাজুরদ্দিন: 'تاج الدين',
  মজু: 'ماجو',
  মিঞা: 'ميا',
  ওরফে: 'المعروف باسم',
  সৈয়দ: 'سيد',
  দেওয়ান: 'ديوان',
  আউয়াল: 'الأول',
  আমিনুল: 'أمين',
  মনিরুল: 'منير',
};

function transliterate(name, map) {
  return name
    .split(' ')
    .map(function (word) {
      return map[word] || word;
    })
    .join(' ');
}

function labelFor(d) {
  if (d.names && d.names[language]) return d.names[language];
  if (language === 'en') return transliterate(d.name, latinMap);
  if (language === 'ar') return transliterate(d.name, arabicMap);
  return d.name;
}

function labelDirection() {
  return language === 'ar' ? 'rtl' : 'ltr';
}

function annotateTree(node, depth) {
  var children = node.children || [];
  var maxDepth = depth;
  node.generation = depth + 1;
  node.directChildren = children.length;
  node.descendantCount = 0;
  children.forEach(function (child) {
    var childMaxDepth = annotateTree(child, depth + 1);
    node.descendantCount += child.descendantCount + 1;
    maxDepth = Math.max(maxDepth, childMaxDepth);
  });
  return maxDepth;
}

function updateSummary(maxDepth, totalPeople) {
  var generations = maxDepth + 1;
  var years = maxDepth * yearsPerGeneration;
  document.getElementById('tree-summary').textContent =
    generations +
    ' generations / ' +
    totalPeople +
    ' people / approximately ' +
    years +
    ' years of family history (based on ' +
    yearsPerGeneration +
    ' years per generation)';
}

function resizeTree() {
  var hostWidth = document.getElementById('tree').clientWidth || 900;
  width = Math.max(1100, hostWidth - margin.left - margin.right);
  height = window.innerWidth < 680 ? 560 : 650;
  tree.size([width, height]);
  svg
    .attr('width', width * horizontalScale + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
  canvas.attr('transform', 'translate(0,' + margin.top + ')');
  if (root) update(root);
}

d3.json('./data/data.json', function (error, data) {
  if (error) throw error;
  root = data;
  var maxDepth = annotateTree(root, 0);
  updateSummary(maxDepth, root.descendantCount + 1);
  root.x0 = (width * horizontalScale) / 2 + margin.left;
  root.y0 = 0;
  if (root.children) root.children.forEach(collapse);
  setTreeMode('collapsed');
  resizeTree();
});

function update(source) {
  var nodes = tree.nodes(root).reverse();
  var links = tree.links(nodes);
  var maxDepth = d3.max(nodes, function (d) {
    return d.depth;
  });
  height = Math.max(window.innerWidth < 680 ? 560 : 650, (maxDepth + 1) * 185);
  tree.size([width, height]);
  nodes.forEach(function (d) {
    d.x = d.x * horizontalScale + margin.left;
  });
  svg
    .attr('width', width * horizontalScale + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
  nodes.forEach(function (d) {
    d.y = d.depth * 185;
  });
  var node = canvas.selectAll('g.node').data(nodes, function (d) {
    return d.id || (d.id = ++i);
  });
  var nodeEnter = node
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function () {
      return 'translate(' + source.x0 + ',' + source.y0 + ')';
    })
    .on('click', click);
  nodeEnter.append('circle').attr('r', 1e-6);
  nodeEnter.append('text').attr('class', 'node-name').attr('y', -14).attr('text-anchor', 'middle');
  nodeEnter.append('text').attr('class', 'node-meta').attr('y', 12).attr('text-anchor', 'middle');
  var nodeUpdate = node
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  nodeUpdate
    .select('circle')
    .attr('r', function (d) {
      return d._children ? 7 : 5.5;
    })
    .style('fill', function (d) {
      return d._children ? '#e86f51' : '#fff';
    });
  nodeUpdate
    .select('.node-name')
    .text(labelFor)
    .attr('direction', labelDirection())
    .style('fill-opacity', 1);
  nodeUpdate
    .select('.node-meta')
    .text(function (d) {
      return 'Children: ' + d.directChildren + ' | Descendants: ' + d.descendantCount;
    })
    .style('fill-opacity', 1);
  node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function () {
      return 'translate(' + source.x + ',' + source.y + ')';
    })
    .remove();
  var link = canvas.selectAll('path.link').data(links, function (d) {
    return d.target.id;
  });
  link
    .enter()
    .insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function () {
      var o = { x: source.x0, y: source.y0 };
      return diagonal({ source: o, target: o });
    });
  link.transition().duration(duration).attr('d', diagonal);
  link
    .exit()
    .transition()
    .duration(duration)
    .attr('d', function () {
      var o = { x: source.x, y: source.y };
      return diagonal({ source: o, target: o });
    })
    .remove();
  nodes.forEach(function (d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

document.getElementById('language').addEventListener('change', function (event) {
  language = event.target.value;
  update(root);
  document.getElementById('tree').setAttribute('lang', language);
});
window.addEventListener('resize', resizeTree);
