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

function expandAll() {
  expand(root);
  update(root);
}

function collapseAll() {
  if (root.children) root.children.forEach(collapse);
  update(root);
}

var language = 'bn';
var margin = { top: 45, right: 80, bottom: 45, left: 110 };
var width = 1100;
var height = 650;
var i = 0;
var duration = 650;
var root;
var tree = d3.layout.tree().size([height, width]);
var diagonal = d3.svg.diagonal().projection(function (d) {
  return [d.y, d.x];
});
var treeHost = d3.select('#tree');
var svg = treeHost.append('svg');
var canvas = svg.append('g').attr('class', 'tree-canvas');
var zoom = d3.behavior
  .zoom()
  .scaleExtent([0.35, 2.4])
  .on('zoom', function () {
    canvas.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
  });
svg.call(zoom);

var latinMap = {
  জিয়া: 'Zia',
  উদ্দিন: 'Uddin',
  মোছলেম: 'Moslem',
  ছৈয়দ: 'Syed',
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
  তছলিম: 'Taslima',
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
  দেওয়ান: 'Dewan',
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
  তৈয়বুর: 'Taiyabur',
  আউয়াল: 'Awwal',
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
  মিয়া: 'Mia',
  ওরফে: 'alias',
};
var arabicMap = {
  জিয়া: 'ضياء',
  উদ্দিন: 'الدين',
  মোছলেম: 'مسلم',
  ছৈয়দ: 'سيد',
  আলী: 'علي',
  হোসেন: 'حسين',
  মাজেদ: 'ماجد',
  তাজিব: 'تاجب',
  সামসুদ্দিন: 'شمس الدين',
  জামাল: 'جمال',
  শরিফ: 'شريف',
  মোহাম্মদ: 'محمد',
  আজগর: 'أزغر',
  মহব্বত: 'محبت',
  জাকির: 'ذاكر',
  সুলতান: 'سلطان',
  সাদাত: 'سعادات',
  সাবির: 'صابر',
  দীন: 'الدين',
  দেওয়ান: 'ديوان',
  শাহাবুদ্দিন: 'شهاب الدين',
  মকবুল: 'مقبول',
  আব্দুর: 'عبد',
  রহমান: 'الرحمن',
  হাসিবুর: 'حسيبور',
  ইসলাম: 'الإسلام',
  আহকাম: 'أحكام',
  রমিজদ্দিন: 'رميز الدين',
  ইমাম: 'إمام',
  মোছলেহ: 'مصلح',
  জালাল: 'جلال',
  রহিম: 'رحيم',
  এলাহি: 'إلهي',
  কালাই: 'كلائي',
  মাজম: 'ماجم',
  তাজু: 'تاجو',
  মজু: 'ماجو',
  মিয়া: 'ميا',
  ওরফে: 'المعروف باسم',
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

function resizeTree() {
  var hostWidth = document.getElementById('tree').clientWidth || 900;
  width = Math.max(1100, hostWidth - margin.left - margin.right);
  height = window.innerWidth < 680 ? 560 : 650;
  tree.size([height, width]);
  svg
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
  canvas.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  if (root) update(root);
}

d3.json('./data/data.json', function (error, data) {
  if (error) throw error;
  root = data;
  root.x0 = height / 2;
  root.y0 = 0;
  if (root.children) root.children.forEach(collapse);
  resizeTree();
});

function update(source) {
  var nodes = tree.nodes(root).reverse();
  var links = tree.links(nodes);
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
      return 'translate(' + source.y0 + ',' + source.x0 + ')';
    })
    .on('click', click);
  nodeEnter.append('circle').attr('r', 1e-6);
  nodeEnter
    .append('text')
    .attr('x', function (d) {
      return d.children || d._children ? -12 : 12;
    })
    .attr('dy', '.35em')
    .attr('text-anchor', function (d) {
      return d.children || d._children ? 'end' : 'start';
    });
  var nodeUpdate = node
    .transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')';
    });
  nodeUpdate
    .select('circle')
    .attr('r', function (d) {
      return d._children ? 7 : 5.5;
    })
    .style('fill', function (d) {
      return d._children ? '#e86f51' : '#fff';
    });
  nodeUpdate.select('text').text(labelFor).style('fill-opacity', 1);
  node
    .exit()
    .transition()
    .duration(duration)
    .attr('transform', function () {
      return 'translate(' + source.y + ',' + source.x + ')';
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
